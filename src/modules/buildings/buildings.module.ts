import { forwardRef, Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/users.entity';
import { Building } from './entities/building.entity';
import { FloorsModule } from '../floors/floors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Building]),
    forwardRef(() => FloorsModule),
  ],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
