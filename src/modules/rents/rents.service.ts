import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { RoomsService } from '../rooms/rooms.service';
import { StudentRent } from '../student-rent/entities/student-rent.entity';
import { CreateRentDto, QueryRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentRepo: Repository<Rent>,
    @InjectRepository(StudentRent)
    private studentRentRepo: Repository<StudentRent>,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
    @Inject(forwardRef(() => RoomsService))
    private roomsService: RoomsService,
  ) {}
  async create(payload: CreateRentDto) {
    const rooms = await this.roomsService.findAll({
      buildingId: payload.buildingId,
    });
    const building = await this.buildingRepo.findOne({
      where: {
        id: payload.buildingId,
      },
    });
    const rent = await this.rentRepo.save({
      ...payload,
      building: building,
    });
    await Promise.all(
      rooms.map(async (room) => {
        room.users.map(async (user) => {
          await this.studentRentRepo.save({
            student: user,
            rent: rent,
          });
        });
      }),
    );
    return rent;
  }

  async findAll(query: QueryRentDto) {
    const rents = await this.rentRepo.find({
      where: {
        building: {
          id: query.buildingId,
        },
      },
    });
    return rents;
  }

  async findOne(id: string) {
    return await this.studentRentRepo.find({
      where: {
        rent: {
          id: id,
        },
      },
      relations: ['student'],
    });
  }

  async findOneForStudent(studentId: string) {
    return await this.studentRentRepo.find({
      where: {
        student: {
          id: studentId,
        },
      },
      relations: ['rent'],
    });
  }

  async update(id: string, payload: UpdateRentDto) {
    if (payload.paid && payload.paid.length > 0) {
      await Promise.all(
        payload.paid.map(async (studentId: string) => {
          const studentRent = await this.studentRentRepo.findOne({
            where: {
              student: {
                id: studentId,
              },
              rent: {
                id: id,
              },
            },
          });
          await this.studentRentRepo.save({
            ...studentRent,
            paid: true,
          });
        }),
      );
    }
    return {
      message: 'updated',
    };
  }
}
