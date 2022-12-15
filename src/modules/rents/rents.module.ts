import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { StudentRent } from '../student-rent/entities/student-rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, StudentRent])],
  controllers: [RentsController],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
