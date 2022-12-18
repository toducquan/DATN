import { forwardRef, Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { StudentRent } from '../student-rent/entities/student-rent.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { Building } from '../buildings/entities/building.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rent, StudentRent, Building]),
    forwardRef(() => RoomsModule),
  ],
  controllers: [RentsController],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
