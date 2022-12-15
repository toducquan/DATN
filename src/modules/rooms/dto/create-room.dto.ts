import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  square: string;

  @IsString()
  buildingId: string;

  @IsString()
  managerId: string;

  @IsString()
  note?: string;

  @IsNumber()
  maxStudentAllow: number;

  @IsNumber()
  numberOfBed: number;

  @IsNumber()
  numberOfAirConditional: number;

  @IsNumber()
  numberOfFan: number;

  @IsBoolean()
  onlyForeign: boolean;

  @IsBoolean()
  onlyFemale: boolean;
}

export class QueryRoomDto {
  @IsString()
  buildingId: string;
}
