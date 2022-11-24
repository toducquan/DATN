import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HobbiesModule } from './hobbies/hobbies.module';
import { MajorsModule } from './majors/majors.module';
import { BuildingsModule } from './buildings/buildings.module';
import { FloorsModule } from './floors/floors.module';
import { RentsModule } from './rents/rents.module';
import { StudentRentModule } from './student-rent/student-rent.module';
import { RoomsModule } from './rooms/rooms.module';
import ormConfig from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    HobbiesModule,
    MajorsModule,
    BuildingsModule,
    FloorsModule,
    RentsModule,
    StudentRentModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
