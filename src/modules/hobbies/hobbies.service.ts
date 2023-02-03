import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hobby } from './entities/hobby.entity';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectRepository(Hobby)
    private hobbyRepo: Repository<Hobby>,
  ) {}
  async createHobby(name: string) {
    return await this.hobbyRepo
      .createQueryBuilder()
      .insert()
      .into(Hobby)
      .values({
        name: name,
      })
      .orIgnore()
      .execute();
  }

  async getAllHobbies() {
    const hobbies = await this.hobbyRepo.find();
    const data = hobbies.map((item) => item.name);
    return {
      data,
    };
  }

  async findHobbyByName(name: string) {
    return this.hobbyRepo.findOne({
      where: {
        name,
      },
    });
  }
}
