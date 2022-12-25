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

@UseGuards(JwtAuthGuard)
@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) {}

  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentsService.create(createRentDto);
  }

  @Get()
  findAll(@Query() query: QueryRentDto) {
    return this.rentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentsService.findOne(id);
  }

  @Get('/student')
  findOneForStudent(@Request() req, @Query() query: StudentQueryRentDto) {
    return this.rentsService.findOneForStudent(req.user.id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateRentDto) {
    return this.rentsService.update(id, payload);
  }
}
