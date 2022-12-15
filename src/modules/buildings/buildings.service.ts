import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../users/entity/users.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
    @Inject(forwardRef(() => RoomsService))
    private roomService: RoomsService,
  ) {}
  async create(payload: CreateBuildingDto) {
    const manage = await this.userRepo.findOne({
      where: {
        id: payload.managerId,
      },
    });
    return await this.buildingRepo.save({
      ...payload,
      manager: manage,
    });
  }

  async findAll() {
    return await this.buildingRepo.find({
      relations: ['manager'],
    });
  }

  async findOne(id: string) {
    const rooms = await this.roomService.findAll({ buildingId: id });
    const building = await this.buildingRepo.findOne({
      where: {
        id: id,
      },
      relations: ['manager'],
    });
    return {
      ...building,
      rooms,
    };
  }

  async update(id: string, payload: UpdateBuildingDto) {
    const building = await this.buildingRepo.findOne({
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
      building.manager = manager;
    }
    return await this.buildingRepo.save({
      ...building,
      ...payload,
    });
  }
}
