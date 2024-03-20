import { InjectRepository } from '@nestjs/typeorm';
import { ID } from 'src/common/types/type';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';

export class CarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private repository: Repository<CarEntity>,
  ) {}

  async getOneByIndex(index: string): Promise<CarEntity | undefined> {
    return await this.repository.findOne({
      relations: ['owner'],
      where: { index },
    });
  }

  async getOneById(id: ID): Promise<CarEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }
  async getAll(): Promise<CarEntity[]> {
    return await this.repository.find();
  }
  async createCar(entity: CarEntity): Promise<CarEntity> {
    return await this.repository.save(entity);
  }
  async updateCar(entity: CarEntity, id: ID): Promise<CarEntity> {
    const data = await this.repository.update(id,entity);
    return data.raw
  }
  async deleteCar(entity: CarEntity): Promise<CarEntity> {
    return await this.repository.remove(entity);
  }
}
