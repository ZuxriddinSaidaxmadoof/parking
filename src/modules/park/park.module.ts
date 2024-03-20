import { Module } from '@nestjs/common';
import { ParkService } from './park.service';
import { ParkController } from './park.controller';
import { ParkRepository } from './park.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkEntity } from './entities/park.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkEntity])],
  controllers: [ParkController],
  providers: [ParkService, ParkRepository],
})
export class ParkModule {}
