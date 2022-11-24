import { Module } from '@nestjs/common';
import { StudentRentService } from './student-rent.service';
import { StudentRentController } from './student-rent.controller';

@Module({
  controllers: [StudentRentController],
  providers: [StudentRentService]
})
export class StudentRentModule {}
