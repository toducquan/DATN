import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      relations: ['manage'],
    });
  }

  async findOne(id: string) {
    return await this.buildingRepo.findOne({
      where: {
        id: id,
      },
      relations: ['manage'],
    });
  }

  async update(id: string, payload: UpdateBuildingDto) {
    const building = await this.findOne(id);
    if (payload.managerId) {
      const manager = await this.userRepo.findOne({
        where: {
          id: payload.managerId,
        },
      });
      building.manager = manager;
    }
    return await this.userRepo.save({
      ...building,
      ...payload,
    });
  }
}
