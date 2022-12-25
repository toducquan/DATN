import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomFee } from '../room-fee/entities/room-fee.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { Fee } from './entities/fees.entity';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fee, RoomFee]),
    forwardRef(() => RoomsModule),
  ],
  controllers: [FeesController],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
