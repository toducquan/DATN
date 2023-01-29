import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { Room } from '../rooms/entities/room.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { User } from '../users/entity/users.entity';
import { AspirationController } from './aspirations.controller';
import { AspirationService } from './aspirations.service';
import { Aspiration } from './entities/aspiration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aspiration, User, Room]),
    forwardRef(() => RoomsModule),
    forwardRef(() => MailModule),
  ],
  controllers: [AspirationController],
  providers: [AspirationService],
  exports: [AspirationService],
})
export class AspirationModule {}
