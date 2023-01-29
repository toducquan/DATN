import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './configs/typeorm.config';
import { AspirationModule } from './modules/aspirations/aspirations.module';
import { AuthModule } from './modules/auth/auth.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { FeesModule } from './modules/fees/fees.module';
import { HobbiesModule } from './modules/hobbies/hobbies.module';
import { MailModule } from './modules/mail/mail.module';
import { RentsModule } from './modules/rents/rents.module';
import { RoomSwapModule } from './modules/room-swap/room-swap.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { StudentRentModule } from './modules/student-rent/student-rent.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    HobbiesModule,
    BuildingsModule,
    RentsModule,
    StudentRentModule,
    RoomsModule,
    AuthModule,
    FeesModule,
    RoomSwapModule,
    AspirationModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
