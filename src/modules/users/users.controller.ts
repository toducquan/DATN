import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { QueryUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: QueryUserDto) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() pyaload: UpdateUserDto) {
    return await this.usersService.update(id, pyaload);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
