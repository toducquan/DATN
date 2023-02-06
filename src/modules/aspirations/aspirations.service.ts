import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Room } from '../rooms/entities/room.entity';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../users/entity/users.entity';
import { CreateAspirationDto } from './dto/crud.dto';
import { Aspiration } from './entities/aspiration.entity';

@Injectable()
export class AspirationService {
  constructor(
    @InjectRepository(Aspiration)
    private aspirationRepo: Repository<Aspiration>,
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => RoomsService))
    private roomsService: RoomsService,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  async create(payload: CreateAspirationDto, userId: string) {
    const [firstRoom, secondRoom, thirdRoom] = await Promise.all([
      this.roomsService.findOne(payload.firstRoomId),
      this.roomsService.findOne(payload.secondRoomId),
      this.roomsService.findOne(payload.thirdRoomId),
    ]);
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
    return await this.aspirationRepo.save({
      student: user,
      firstRoom: firstRoom,
      secondRoom: secondRoom,
      thirdRoom: thirdRoom,
    });
  }

  async findAll() {
    return await this.aspirationRepo.find({
      relations: ['student', 'firstRoom', 'secondRoom', 'thirdRoom'],
    });
  }

  async getMyAspiration(userId: string) {
    return await this.aspirationRepo.findOne({
      where: {
        student: {
          id: userId,
        },
      },
      relations: ['student', 'firstRoom', 'secondRoom', 'thirdRoom'],
    });
  }

  async delete(id: string) {
    const aspiration = await this.aspirationRepo.findOne({
      where: {
        id: id,
      },
      relations: ['student'],
    });
    await this.mailService.sendEmailRejectAspiration(aspiration.student.email);
    await this.aspirationRepo.delete({
      id: id,
    });
    return {
      message: 'deleted',
    };
  }

  async approveAll(ids: string[]) {
    let fistAsp = [...ids];
    await Promise.all(
      ids.map(async (id, index) => {
        const asp = await this.aspirationRepo.findOne({
          where: {
            id: id,
          },
          relations: ['student', 'firstRoom'],
        });

        if (
          asp &&
          asp.firstRoom.numberOfStudent < asp.firstRoom.maxStudentAllow
        ) {
          const user = { ...asp.student };
          await this.userRepo.save({
            ...user,
            room: asp.firstRoom,
          });
          await this.delete(id);
          fistAsp = fistAsp.filter((item) => {
            item != id;
          });
        }
      }),
    );

    let secondAsp = [...fistAsp];
    await Promise.all(
      fistAsp.map(async (id, index) => {
        const asp = await this.aspirationRepo.findOne({
          where: {
            id: id,
          },
          relations: ['student', 'secondRoom'],
        });
        if (
          asp &&
          asp.secondRoom.numberOfStudent < asp.secondRoom.maxStudentAllow
        ) {
          const user = { ...asp.student };
          await this.userRepo.save({
            ...user,
            room: asp.secondRoom,
          });
          await this.delete(id);
          secondAsp = secondAsp.filter((item) => {
            item != id;
          });
        }
      }),
    );

    let thirdAsp = [...secondAsp];
    await Promise.all(
      secondAsp.map(async (id, index) => {
        const asp = await this.aspirationRepo.findOne({
          where: {
            id: id,
          },
          relations: ['student', 'thirdRoom'],
        });
        if (
          asp &&
          asp.thirdRoom.numberOfStudent < asp.thirdRoom.maxStudentAllow
        ) {
          const user = { ...asp.student };
          await this.userRepo.save({
            ...user,
            room: asp.thirdRoom,
          });
          await this.delete(id);
          thirdAsp = thirdAsp.filter((item) => {
            item != id;
          });
        }
      }),
    );
    if (thirdAsp.length > 0) {
      await Promise.all(
        thirdAsp.map(async (id) => {
          const asp = await this.aspirationRepo.findOne({
            where: {
              id: id,
            },
            relations: ['student'],
          });
          await this.mailService.sendEmailRejectAspiration(asp.student.email);
        }),
      );
    }
    await this.roomsService.updateNumberOfUserInRoom();
    return {
      message: 'done',
    };
  }
}
