import { IsNumber, IsOptional, IsString } from 'class-validator';

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
  studentId;

  @IsString()
  buildingId;
}
