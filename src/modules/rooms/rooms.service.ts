import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Floor } from '../floors/entities/floor.entity';
import { CreateRoomDto, QueryRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    @InjectRepository(Floor)
    private floorRepo: Repository<Floor>,
  ) {}
  async create(payload: CreateRoomDto) {
    const floor = await this.floorRepo.findOne({
      where: {
        id: payload.floorId,
      },
    });
    return await this.roomRepo.save({
      ...payload,
      floor: floor,
    });
  }

  async findAll(payload: QueryRoomDto) {
    const rooms = await this.roomRepo.find({
      where: {
        floor: {
          id: payload.floorId,
        },
      },
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
