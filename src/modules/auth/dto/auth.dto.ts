import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/user.dto';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterUserDto extends CreateUserDto {}
