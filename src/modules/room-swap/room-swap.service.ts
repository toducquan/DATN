import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entity/users.entity';
import { ApproveSwapRoomDto, CreateSwapRoomDto } from './dto/room-swap.dto';
import { RoomSwap } from './entities/room-swap.entity';

@Injectable()
export class RoomSwapService {
  constructor(
    @InjectRepository(RoomSwap)
    private roomSwapRepo: Repository<RoomSwap>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Room)
    private room: Repository<Room>,
    @Inject(forwardRef(() => MailService))
    private mailService: MailService,
  ) {}

  async requestSwapRoom(requestId: string, payload: CreateSwapRoomDto) {
    const requestUser = await this.userRepo.findOne({
      where: {
        id: requestId,
      },
    });

    const receiveUser = await this.userRepo.findOne({
      where: {
        id: payload.receiveId,
      },
    });

    await this.roomSwapRepo.save({
      requestUser: requestUser,
      receiveUser: receiveUser,
    });
    return {
      message: 'sucess',
    };
  }

  async getAllRoomSwapRequest(userId: string, role: string) {
    const fullTextSearch = [];
    if (role == Role.USER) {
      fullTextSearch.push(`roomSwap.receiveUserId = '${userId}'`);
      fullTextSearch.push(`roomSwap.isApproveByReceiveUser = 0`);
    } else {
      fullTextSearch.push(`roomSwap.isApproveByReceiveUser = 1`);
    }
    fullTextSearch.push(`roomSwap.isApproveByAdmin = 0`);

    return await this.roomSwapRepo
      .createQueryBuilder('roomSwap')
      .leftJoinAndSelect('roomSwap.requestUser', 'requestUser')
      .leftJoinAndSelect('requestUser.room', 'requestRoom')
      .leftJoinAndSelect('roomSwap.receiveUser', 'receiveUser')
      .leftJoinAndSelect('receiveUser.room', 'receiveRoom')
      .where(fullTextSearch.join(' and '))
      .getMany();
  }

  async update(id: string) {
    const swapRoom = await this.roomSwapRepo.findOne({
      where: {
        id: id,
      },
    });

    return await this.roomSwapRepo.save({
      ...swapRoom,
      isApproveByReceiveUser: true,
    });
  }

  async delete(id: string) {
    const swapRoom = await this.roomSwapRepo.findOne({
      where: {
        id: id,
      },
      relations: ['requestUser'],
    });
    await this.mailService.sendEmailRejectSwapRoom(swapRoom.requestUser.email);
    await this.roomSwapRepo.delete({
      id: id,
    });
    return {
      mess: 'success',
    };
  }

  async adminApproveMultipleUsers(payload: ApproveSwapRoomDto) {
    await Promise.all(
      payload.swapIds.map(async (id) => {
        const roomSwap = await this.roomSwapRepo.findOne({
          where: {
            id: id,
          },
          relations: ['requestUser', 'receiveUser'],
        });
        const requestUser = await this.userRepo.findOne({
          where: {
            id: roomSwap.requestUser.id,
          },
          relations: ['room'],
        });
        const receiveUser = await this.userRepo.findOne({
          where: {
            id: roomSwap.receiveUser.id,
          },
          relations: ['room'],
        });
        await this.userRepo.save({
          ...requestUser,
          room: receiveUser.room,
        });
        await this.userRepo.save({
          ...receiveUser,
          room: requestUser.room,
        });
        await this.roomSwapRepo.save({
          ...roomSwap,
          isApproveByAdmin: true,
        });
      }),
    );
    return {
      message: 'success',
    };
  }
}
