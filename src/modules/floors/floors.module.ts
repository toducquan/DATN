import { Module } from '@nestjs/common';
import { FloorsService } from './floors.service';
import { FloorsController } from './floors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floor } from './entities/floor.entity';
import { Building } from '../buildings/entities/building.entity';
import { User } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floor, Building, User])],
  controllers: [FloorsController],
  providers: [FloorsService],
})
export class FloorsModule {}
