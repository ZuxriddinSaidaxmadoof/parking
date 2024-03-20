import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from '../car/car.service';
import { ParkService } from '../park/park.service';
import { RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorators/Auth.decorator';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly carService: CarService,
    private readonly parkService: ParkService,
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const { data: foundPark } = await this.parkService.findOneById(
      createTransactionDto.parkId,
    );
    const { data: foundCar } = await this.carService.findOneByIndex(
      createTransactionDto.carIndex,
    );

    return await this.transactionService.createTransaction(
      foundCar.owner,
      foundCar,
      foundPark,
    );
  }

  // @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  // @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  // @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
