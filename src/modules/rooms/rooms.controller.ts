import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, QueryRoomDto } from './dto/create-room.dto';
import { DeleteStudentInRoomDto, UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get('')
  findAll(@Query() query: QueryRoomDto) {
    return this.roomsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/suitable-room')
  findSuitableRoomForStudent(@Request() req: any) {
    return this.roomsService.findSuitableRoomForStudent(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Patch('/students-in-room')
  deleteStudent(@Body() students: DeleteStudentInRoomDto) {
    return this.roomsService.deleteStudent(students);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FLOOR_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
