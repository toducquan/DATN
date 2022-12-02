import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from './configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { FloorsModule } from './modules/floors/floors.module';
import { HobbiesModule } from './modules/hobbies/hobbies.module';
import { RentsModule } from './modules/rents/rents.module';
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
    FloorsModule,
    RentsModule,
    StudentRentModule,
    RoomsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
