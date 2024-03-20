import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarRepository } from './car.repository';
import { CarNotFoundException } from './exception/car.exception';
import { ResData } from 'src/lib/resData';
import { CarEntity } from './entities/car.entity';
import { UserService } from '../user/user.service';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';

@Injectable()
export class CarService {
  constructor(private readonly repository: CarRepository, @Inject("UserService") private readonly userService: UserService  ){}

  async create(createCarDto: CreateCarDto) {
    const {data: foundUser} = await this.userService.findOne(createCarDto.owner_id)
    const newCar = new CarEntity();
    newCar.index = createCarDto.index;
    newCar.owner = foundUser;
    const created = await this.repository.createCar(newCar)
    return new ResData("Car created", 201, created);
  }

  async findAll() {
    const data = await this.repository.getAll();
    return new ResData("All cars", 200, data);
  }

  async findOne(id: number) {
    const data = await this.repository.getOneById(id);
    return new ResData("one car by id", 200, data);
  }

  async findOneByIndex(index: string): Promise<ResData<CarEntity>> {
    const resData = await this.repository.getOneByIndex(index);

    if (!resData) {
      throw new CarNotFoundException();
    }

    return new ResData<CarEntity>('success', 200, resData);
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const {data: foundCarById} = await this.findOne(id)

    const {data: foundUser} = await this.userService.findOne(updateCarDto?.owner_id)
    const newEntity = new CarEntity();
    newEntity.index = updateCarDto?.index;
    newEntity.owner = foundUser;

    const  newCar = Object.assign(foundCarById, newEntity)
    await this.update(id, newCar);

    return new ResData("Car updated successfullu", 200, newCar);
  }

  async remove(id: number) {
    const {data: foundById} = await this.findOne(id)
    const deleted = await this.repository.deleteCar(foundById)
    return new ResData("Car deleted successfully", 200, deleted);
  }
}
