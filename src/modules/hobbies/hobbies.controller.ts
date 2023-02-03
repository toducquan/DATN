import { Controller, Get } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';

@Controller('hobbies')
export class HobbiesController {
  constructor(private hobbiesService: HobbiesService) {}
  @Get()
  findAll() {
    return this.hobbiesService.getAllHobbies();
  }
}
