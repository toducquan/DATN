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
import { ApproveSwapRoomDto, CreateSwapRoomDto } from './dto/room-swap.dto';
import { RoomSwapService } from './room-swap.service';

@UseGuards(JwtAuthGuard)
@Controller('room-swap')
export class RoomSwapController {
  constructor(private readonly roomSwapService: RoomSwapService) {}

  @Post()
  create(@Body() body: CreateSwapRoomDto, @Request() req: any) {
    return this.roomSwapService.requestSwapRoom(req.user.id, body);
  }

  @Get()
  getAllRoomSwapRequest(@Request() req: any) {
    return this.roomSwapService.getAllRoomSwapRequest(
      req.user.id,
      req.user.role,
    );
  }

  @Post('approve-swap-request')
  adminApproveMultipleUsers(@Body() payload: ApproveSwapRoomDto) {
    return this.roomSwapService.adminApproveMultipleUsers(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.roomSwapService.update(id);
  }
}
