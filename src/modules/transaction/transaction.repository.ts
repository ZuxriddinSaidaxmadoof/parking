import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ParkEntity } from '../park/entities/park.entity';
import { CarEntity } from '../car/entities/car.entity';
import { ID } from 'src/common/types/type';

export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,

    private dataSource: DataSource,
  ) {}

  async getAllTransactions(){
    return await this.repository.find();
  }
  async getOneTransaction(id: ID){
    return await this.repository.findOneBy({id});
  }

  async deleteTransaction(entity: TransactionEntity){
    return await this.repository.remove(entity);
  }

  async createTransaction(
    userEntity: UserEntity,
    parkEntity: ParkEntity,
    carEntity: CarEntity,
  ): Promise<TransactionEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updateParkEntity = parkEntity;
      updateParkEntity.capacity = updateParkEntity.capacity - 1;

      let newTransactionEntity = new TransactionEntity();

      newTransactionEntity.car = carEntity;
      newTransactionEntity.carDocs = carEntity;
      newTransactionEntity.user = userEntity;
      newTransactionEntity.userDocs = userEntity;
      newTransactionEntity.park = parkEntity;
      newTransactionEntity.enteredAt = new Date();

      await queryRunner.manager.save<ParkEntity>(updateParkEntity);
      newTransactionEntity =
        await queryRunner.manager.save<TransactionEntity>(newTransactionEntity);

      await queryRunner.commitTransaction();

      return newTransactionEntity;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
