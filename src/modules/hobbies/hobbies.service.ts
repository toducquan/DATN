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

  async findHobbyByName(name: string) {
    return this.hobbyRepo.findOne({
      where: {
        name,
      },
    });
  }
}
