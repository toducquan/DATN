import { IsString } from 'class-validator';

export class CreateSwapRoomDto {
  @IsString()
  receiveId: string;
}

export class ApproveSwapRoomDto {
  @IsString({ each: true })
  swapIds: string[];
}
