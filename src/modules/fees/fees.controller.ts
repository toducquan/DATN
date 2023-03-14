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
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
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

  @UseGuards(RolesGuard)
  @Roles(Role.FLOOR_MANAGER)
  @Post()
  create(@Body() payload: CreateFeeDto) {
    return this.feesService.create(payload);
  }

  @Get()
  findAll(@Query() query: QueryFeeDto) {
    return this.feesService.findAll(query);
  }

  @Get('/student')
  findOneForStudent(@Request() req, @Query() query: StudentQueryFeeDto) {
    return this.feesService.findOneForStudent(req.user.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feesService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.FLOOR_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateFeeDto) {
    return this.feesService.update(id, payload);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.FLOOR_MANAGER)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feesService.deleteFee(id);
  }
}
