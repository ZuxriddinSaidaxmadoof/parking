import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';
import { CarEntity } from '../car/entities/car.entity';
import { ParkEntity } from '../park/entities/park.entity';
import { ParkService } from '../park/park.service';
import { ParkRepository } from '../park/park.repository';
import { CarService } from '../car/car.service';
import { CarRepository } from '../car/car.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, CarEntity, ParkEntity]),
    SharedModule
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    ParkService,
    ParkRepository,
    CarService,
    CarRepository,
  ],
})
export class TransactionModule {}
