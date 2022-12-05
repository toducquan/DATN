import { IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  name: string;

  @IsString()
  buildingId: string;

  @IsString()
  managerId: string;
}

export class QueryFloorDto {
  @IsString()
  buildingId: string;
}
