import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobby } from './entities/hobby.entity';
import { HobbiesController } from './hobbies.controller';
import { HobbiesService } from './hobbies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hobby])],
  controllers: [HobbiesController],
  providers: [HobbiesService],
  exports: [HobbiesService],
})
export class HobbiesModule {}
