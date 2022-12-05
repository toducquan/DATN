import { forwardRef, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { FloorsModule } from '../floors/floors.module';
import { Floor } from '../floors/entities/floor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Floor])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
