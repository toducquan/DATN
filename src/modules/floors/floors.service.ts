import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../users/entity/users.entity';
import { CreateFloorDto, QueryFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(Floor)
    private floorRepo: Repository<Floor>,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject(forwardRef(() => RoomsService))
    private roomService: RoomsService,
  ) {}
  async findAll(payload: QueryFloorDto) {
    const floors = await this.floorRepo.find({
      where: {
        building: {
          id: payload.buildingId,
        },
      },
      relations: ['manager'],
    });
    return floors;
  }

  async create(payload: CreateFloorDto) {
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
    return await this.floorRepo.save({
      ...payload,
      building: building,
      manager: manage,
    });
  }

  async findOne(id: string) {
    const rooms = await this.roomService.findAll({
      floorId: id,
    });
    const floor = await this.floorRepo.findOne({
      where: {
        id: id,
      },
    });
    return {
      ...floor,
      rooms,
    };
  }

  async update(id: string, payload: UpdateFloorDto) {
    const floor = await this.floorRepo.findOne({
      where: {
        id: id,
      },
      relations: ['manager'],
    });
    if (payload.managerId) {
      const manager = await this.userRepo.findOne({
        where: {
          id: payload.managerId,
        },
      });
      floor.manager = manager;
    }
    return await this.buildingRepo.save({
      ...floor,
      ...payload,
    });
  }
}
