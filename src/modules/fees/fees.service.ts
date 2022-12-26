import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { RoomFee } from '../room-fee/entities/room-fee.entity';
import { RoomsService } from '../rooms/rooms.service';
import {
  CreateFeeDto,
  QueryFeeDto,
  StudentQueryFeeDto,
  UpdateFeeDto,
} from './dto/fee-crud.dto';
import { Fee } from './entities/fees.entity';

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(Fee)
    private feeRepo: Repository<Fee>,
    @InjectRepository(RoomFee)
    private roomFeeRepo: Repository<RoomFee>,
    @Inject(forwardRef(() => RoomsService))
    private roomService: RoomsService,
  ) {}

  async create(payload: CreateFeeDto) {
    const room = await this.roomService.findOne(payload.roomId);
    const fee = await this.feeRepo.save({
      ...payload,
      room: room,
      deadline: moment(new Date()).add(30, 'd').toDate(),
    });
    await Promise.all(
      room.users.map(async (user) => {
        await this.roomFeeRepo.save({
          fee: fee,
          student: user,
        });
      }),
    );
    return fee;
  }

  async findAll(query: QueryFeeDto) {
    const fullTextSearch = [];
    if (query.roomId) {
      fullTextSearch.push(`fee.roomId = '${query.roomId}'`);
    }
    if (query.type) {
      fullTextSearch.push(`fee.type = '${query.type}'`);
    }
    if (query.name) {
      fullTextSearch.push(`fee.name like '%${query.name}%'`);
    }
    const fees = await this.feeRepo
      .createQueryBuilder('fee')
      .where(fullTextSearch.join(' and '))
      .getMany();
    return fees;
  }

  async findOne(id: string) {
    return await this.roomFeeRepo.find({
      where: {
        fee: {
          id: id,
        },
      },
      relations: ['student'],
    });
  }

  async findOneForStudent(studentId: string, query: StudentQueryFeeDto) {
    const fullTextSearch = [];
    fullTextSearch.push(`roomFee.studentId = '${studentId}'`);
    if (query.name) {
      fullTextSearch.push(`fee.name like '%${query.name}%'`);
    }
    if (query.paid) {
      fullTextSearch.push(`roomFee.paid = ${query.paid}`);
    }
    if (query.type) {
      fullTextSearch.push(`fee.type = '${query.type}'`);
    }
    return await this.roomFeeRepo
      .createQueryBuilder('roomFee')
      .leftJoinAndSelect('roomFee.fee', 'fee')
      .where(fullTextSearch.join(' and '))
      .getMany();
  }

  async update(id: string, payload: UpdateFeeDto) {
    if (payload.paid && payload.paid.length > 0) {
      await Promise.all(
        payload.paid.map(async (studentId: string) => {
          const studentFee = await this.roomFeeRepo.findOne({
            where: {
              student: {
                id: studentId,
              },
              fee: {
                id: id,
              },
            },
            relations: ['student', 'fee'],
          });
          await this.roomFeeRepo.save({
            ...studentFee,
            paid: true,
          });
        }),
      );
    }
    const rent = await this.feeRepo.findOne({
      where: {
        id: id,
      },
    });
    return this.feeRepo.save({
      ...rent,
      ...payload,
    });
  }
}
