import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { SharedModule } from '../shared/shared.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, UserEntity]), SharedModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
