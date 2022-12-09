import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentsController],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
