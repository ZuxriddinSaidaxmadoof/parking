import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ParkRepository } from './park.repository';
import { ResData } from 'src/lib/resData';
import { ParkEntity } from './entities/park.entity';
import { ParkNotFoundException } from './exception/park.exception';

@Injectable()
export class ParkService {
  constructor(private readonly repository: ParkRepository) {}

  async create(createParkDto: CreateParkDto) {
    const foundByName = await this.repository.getOneByName(createParkDto.name);
    if(foundByName){
      throw new BadRequestException(`This(${createParkDto.name}) name already exist`)
    }
    const newPark = new ParkEntity()
    newPark.name = createParkDto.name;
    newPark.price = createParkDto.price;
    newPark.capacity = createParkDto.capacity;
    const created = await this.repository.createPark(newPark);
    return new ResData("Park created", 201, created);
  }

  async findAll() {
    const allPark = await this.repository.getAll()
    return new ResData("all parks", 200, allPark);
  }

  async findOneById(id: number): Promise<ResData<ParkEntity>> {
    const resData = await this.repository.getOneById(id);

    if (!resData) {
      throw new ParkNotFoundException();
    }

    return new ResData<ParkEntity>('success', 200, resData);
  }

  async update(id: number, updateParkDto: UpdateParkDto): Promise<ResData<ParkEntity>> {
    const {data: oldData} = await this.findOneById(id)
    const newEntity = Object.assign(oldData, updateParkDto);
    const updated = await this.repository.updatePark(newEntity, id)
    return new ResData("updated successfully", 200, newEntity);
  }

  async remove(id: number) {
    const {data: oldData} = await this.findOneById(id);
    const deleted = await this.repository.deletePark(oldData);
    return new ResData("Park deleted successfully", 200, deleted);
  }
}
