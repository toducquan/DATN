import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RentsService } from './rents.service';
import {
  CreateRentDto,
  QueryRentDto,
  StudentQueryRentDto,
} from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentsService.create(createRentDto);
  }

  @Get()
  findAll(@Query() query: QueryRentDto) {
    return this.rentsService.findAll(query);
  }

  @Get('/student')
  findOneForStudent(@Request() req, @Query() query: StudentQueryRentDto) {
    return this.rentsService.findOneForStudent(req.user.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentsService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateRentDto) {
    return this.rentsService.update(id, payload);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rentsService.deleteRent(id);
  }
}
