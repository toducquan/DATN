import { IsString } from 'class-validator';

export class CreateFloorDto {
  @IsString()
  name: string;

  @IsString()
  buildingId: string;

  @IsString()
  managerId: string;
}
