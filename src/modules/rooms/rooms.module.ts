import { forwardRef, Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Building } from '../buildings/entities/building.entity';
import { User } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Building, User])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
