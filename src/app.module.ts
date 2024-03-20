import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ParkModule } from './modules/park/park.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { CarModule } from './modules/car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from './modules/file/file.module';
import { UserEntity } from './modules/user/entities/user.entity';
import { CarEntity } from './modules/car/entities/car.entity';
import { ParkEntity } from './modules/park/entities/park.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { FileEntity } from './modules/file/entities/file.entity';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'YOUR_PASSWORD',
      database: 'parking',
      entities: [
        UserEntity,
        CarEntity,
        TransactionEntity,
        ParkEntity,
        FileEntity,
      ],
      synchronize: true,
    }),

    SharedModule,
    AuthModule,
    UserModule,
    ParkModule,
    CarModule,
    TransactionModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
