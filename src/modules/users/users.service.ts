import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbiesService } from '../hobbies/hobbies.service';
import { Room } from '../rooms/entities/room.entity';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @Inject(forwardRef(() => HobbiesService))
    private hobbiesService: HobbiesService,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['room'],
    });
  }

  async createUser(payload: CreateUserDto) {
    await Promise.all(
      payload.hobbies.map(async (item) => {
        await this.hobbiesService.createHobby(item);
      }),
    );
    const listHobbies = await Promise.all(
      payload.hobbies.map(async (item) => {
        return await this.hobbiesService.findHobbyByName(item);
      }),
    );
    delete payload.hobbies;
    return await this.userRepository.save({
      ...payload,
      hobbies: listHobbies,
    });
  }

  async findAll(payload: QueryUserDto) {
    const fullTextSearchQuery = [];
    if (payload.role) {
      fullTextSearchQuery.push(`user.role = '${payload.role}'`);
    }
    if (payload.studentId) {
      fullTextSearchQuery.push(`user.studentId like '%${payload.studentId}%'`);
    }
    if (payload.name) {
      fullTextSearchQuery.push(`user.name like '%${payload.name}%'`);
    }
    if (payload.email) {
      fullTextSearchQuery.push(`user.email like '%${payload.email}%'`);
    }
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.room', 'room')
      .where(fullTextSearchQuery.join(' and '))
      .getMany();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      relations: ['room'],
      where: {
        id: id,
      },
    });
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      relations: ['room'],
      where: {
        id: id,
      },
    });
    if (payload.roomId) {
      const room = await this.roomRepository.findOne({
        where: {
          id: payload.roomId,
        },
      });
      user.room = room;
    }
    if (payload.hobbies && payload.hobbies.length != 0) {
      await Promise.all(
        payload.hobbies.map(async (item) => {
          await this.hobbiesService.createHobby(item);
        }),
      );
      const listHobbies = await Promise.all(
        payload.hobbies.map(async (item) => {
          return await this.hobbiesService.findHobbyByName(item);
        }),
      );
      user.hobbies = listHobbies;
    }
    const { hobbies, ...data } = payload;
    return await this.userRepository.save({
      ...user,
      ...data,
    });
  }

  async deleteUser(id: string) {
    await this.userRepository.delete({
      id: id,
    });
    return {
      message: 'deleted',
    };
  }
}
