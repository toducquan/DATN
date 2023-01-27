import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateAspirationDto {
  @IsString()
  firstRoomId: string;

  @IsString()
  secondRoomId: string;

  @IsString()
  thirdRoomId: string;
}

export class UpdateAspirationDto extends PartialType(CreateAspirationDto) {}
