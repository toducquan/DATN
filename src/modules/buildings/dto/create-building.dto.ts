import { IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  numberOfFloors: string;

  @IsString()
  images: string;

  @IsString()
  managerId: string;
}
