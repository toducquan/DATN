import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/enums/gender.enum';
import { Major } from 'src/enums/major.enum';
import { Religion } from 'src/enums/religion.enum';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  isSmoking: boolean;

  @IsEnum(Religion)
  religion: Religion;

  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  age: string;

  @IsString()
  @IsOptional()
  studentId: string;

  @IsString()
  @IsOptional()
  fatherName: string;

  @IsString()
  @IsOptional()
  fatherAge: string;

  @IsString()
  @IsOptional()
  fatherEmail: string;

  @IsString()
  @IsOptional()
  fatherPhone: string;

  @IsString()
  @IsOptional()
  fatherOccupation: string;

  @IsString()
  @IsOptional()
  motherName: string;

  @IsString()
  @IsOptional()
  motherAge: string;

  @IsString()
  @IsOptional()
  motherEmail: string;

  @IsString()
  @IsOptional()
  motherPhone: string;

  @IsString()
  @IsOptional()
  motherOccupation: string;

  @IsString()
  @IsOptional()
  grade: string;

  @IsArray()
  @IsOptional()
  hobbies: string[];

  @IsEnum(Major)
  @IsOptional()
  major: Major;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  roomId: string;
}

export class QueryUserDto {
  @IsEnum(Role)
  @IsOptional()
  role: Role;

  @IsString()
  @IsOptional()
  studentId: string;
}
