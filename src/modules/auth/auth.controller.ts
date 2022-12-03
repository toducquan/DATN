import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() payload: RegisterUserDto) {
    return {
      accessToken: await this.authService.registerUser(payload),
    };
  }

  @Post('/login')
  async login(@Body() payload: LoginUserDto) {
    return {
      accessToken: await this.authService.login(payload),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUILDING_MANAGER)
  @Get()
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
