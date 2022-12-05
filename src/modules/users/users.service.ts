import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HobbiesService } from '../hobbies/hobbies.service';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => HobbiesService))
    private hobbiesService: HobbiesService,
  ) {}

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
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
  }
}
