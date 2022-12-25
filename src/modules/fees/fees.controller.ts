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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  CreateFeeDto,
  QueryFeeDto,
  StudentQueryFeeDto,
  UpdateFeeDto,
} from './dto/fee-crud.dto';
import { FeesService } from './fees.service';

@UseGuards(JwtAuthGuard)
@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post()
  create(@Body() payload: CreateFeeDto) {
    return this.feesService.create(payload);
  }

  @Get()
  findAll(@Query() query: QueryFeeDto) {
    return this.feesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feesService.findOne(id);
  }

  @Get('/student')
  findOneForStudent(@Request() req, @Query() query: StudentQueryFeeDto) {
    return this.feesService.findOneForStudent(req.user.id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateFeeDto) {
    return this.feesService.update(id, payload);
  }
}
