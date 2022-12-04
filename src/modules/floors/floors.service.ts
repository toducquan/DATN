import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { User } from '../users/entity/users.entity';
import { CreateFloorDto } from './dto/create-floor.dto';
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
  ) {}
  async create(payload: CreateFloorDto) {
    const building = await this.floorRepo.findOne({
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

  findAll() {
    return `This action returns all floors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floor`;
  }

  update(id: number, updateFloorDto: UpdateFloorDto) {
    return `This action updates a #${id} floor`;
  }

  remove(id: number) {
    return `This action removes a #${id} floor`;
  }
}
