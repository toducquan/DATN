import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsString()
  @IsOptional()
  managerId: string;
}

export class DeleteStudentInRoomDto {
  @IsString({ each: true })
  students: string[];
}
