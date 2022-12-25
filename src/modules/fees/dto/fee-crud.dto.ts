import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FeeType } from 'src/enums/fee.enum';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFeeDto {
  @IsString()
  name: string;

  @IsNumber()
  cost: number;

  @IsEnum(FeeType)
  type: FeeType;

  @IsDateString()
  @IsOptional()
  deadline: Date;

  @IsString()
  roomId: string;
}

export class QueryFeeDto {
  @IsString()
  @IsOptional()
  roomId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(FeeType)
  @IsOptional()
  type: FeeType;
}

export class StudentQueryFeeDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @IsEnum(FeeType)
  @IsOptional()
  type: FeeType;
}

export class UpdateFeeDto extends PartialType(CreateFeeDto) {
  @IsArray()
  @IsOptional()
  paid?: string[];
}
