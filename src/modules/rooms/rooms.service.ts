import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { User } from '../users/entity/users.entity';
import { CreateRoomDto, QueryRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(payload: CreateRoomDto) {
    const building = await this.buildingRepo.findOne({
      where: {
        id: payload.buildingId,
      },
    });
    const manage = await this.userRepo.findOne({
      where: {
        id: payload.managerId,
      },
    });
    return await this.roomRepo.save({
      ...payload,
      building: building,
      manager: manage,
    });
  }

  async findAll(payload: QueryRoomDto) {
    const rooms = await this.roomRepo.find({
      where: {
        building: {
          id: payload.buildingId,
        },
      },
      relations: ['manager', 'users'],
    });
    return rooms;
  }

  async findOne(id: string) {
    return await this.roomRepo.findOne({
      where: {
        id: id,
      },
      relations: ['users'],
    });
  }

  async update(id: string, payload: UpdateRoomDto) {
    const room = await this.roomRepo.findOne({
      where: {
        id: id,
      },
    });

    return await this.roomRepo.save({
      ...room,
      ...payload,
    });
  }
}
