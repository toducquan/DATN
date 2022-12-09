import { IsNumber, IsString } from 'class-validator';

export class CreateRentDto {
  @IsNumber()
  cost: number;

  @IsString()
  buildingId: string;
}
