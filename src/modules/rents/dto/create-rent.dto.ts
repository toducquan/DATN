import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRentDto {
  @IsNumber()
  cost: number;

  @IsString()
  buildingId: string;

  @IsString()
  name: string;
}

export class QueryRentDto {
  @IsString()
  @IsOptional()
  buildingId: string;

  @IsString()
  @IsOptional()
  name: string;
}

export class StudentQueryRentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  paid: boolean;
}
