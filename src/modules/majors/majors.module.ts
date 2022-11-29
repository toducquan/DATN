import { Module } from '@nestjs/common';
import { MajorsService } from './majors.service';

@Module({
  providers: [MajorsService],
  exports: [MajorsService],
})
export class MajorsModule {}
