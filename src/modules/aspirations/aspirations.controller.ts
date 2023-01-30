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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { ApproveAspirationDto, CreateAspirationDto } from './dto/crud.dto';
import { AspirationService } from './aspirations.service';

@Controller('aspiration')
@UseGuards(JwtAuthGuard)
export class AspirationController {
  constructor(private aspriationService: AspirationService) {}
  @Post()
  create(@Body() payload: CreateAspirationDto, @Request() req: any) {
    return this.aspriationService.create(payload, req.user.id);
  }

  @Get()
  findAll() {
    return this.aspriationService.findAll();
  }

  @Post('/approve-multiple-aspiration')
  approveAll(@Body() payload: ApproveAspirationDto) {
    return this.aspriationService.approveAll(payload.ids);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.delete(id);
  }
}
