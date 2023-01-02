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
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, QueryRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
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
  @Roles(Role.FLOOR_MANAGER)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FLOOR_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }
}
