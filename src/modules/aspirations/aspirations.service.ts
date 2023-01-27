import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    @InjectRepository(Room)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => RoomsService))
    private roomsService: RoomsService,
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
    return null;
  }
}
