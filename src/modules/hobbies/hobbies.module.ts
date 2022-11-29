import { Module } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';

@Module({
  providers: [HobbiesService],
  exports: [HobbiesService],
})
export class HobbiesModule {}
