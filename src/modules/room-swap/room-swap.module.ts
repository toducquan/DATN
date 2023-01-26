import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { User } from '../users/entity/users.entity';
import { RoomSwap } from './entities/room-swap.entity';
import { RoomSwapController } from './room-swap.controller';
import { RoomSwapService } from './room-swap.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomSwap, User, Room])],
  controllers: [RoomSwapController],
  providers: [RoomSwapService],
  exports: [RoomSwapService],
})
export class RoomSwapModule {}
