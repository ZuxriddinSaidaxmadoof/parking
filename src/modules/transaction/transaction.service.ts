import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { UserEntity } from '../user/entities/user.entity';
import { CarEntity } from '../car/entities/car.entity';
import { ParkEntity } from '../park/entities/park.entity';
import { ResData } from 'src/lib/resData';
import { TransactionEntity } from './entities/transaction.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common/exceptions';


@Injectable()
export class TransactionService {
  constructor(private readonly repository: TransactionRepository) {}

  async createTransaction(
    userEntity: UserEntity,
    carEntity: CarEntity,
    parkEntity: ParkEntity,
  ): Promise<ResData<TransactionEntity>> {
    const resData: TransactionEntity = await this.repository.createTransaction(
      userEntity,
      parkEntity,
      carEntity,
    );

    return new ResData<TransactionEntity>('crated', 201, resData);
  }

  async findAll() {
    const data = await this.repository.getAllTransactions();
    return new ResData("All transactions", 200, data);
  }

  async findOne(id: number) {
    const findOne = await this.repository.getOneTransaction(id)
    if(!findOne){
      throw new NotFoundException("Transaction not found") 
    }
    return new ResData("One transaction by id", 200, findOne);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    const {data: foundOne} = await this.findOne(id);
    const deleted = await this.repository.deleteTransaction(foundOne);
    return new ResData("deleted successfully", 200, deleted);
  }
}
