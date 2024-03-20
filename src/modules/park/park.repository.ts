import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkEntity } from './entities/park.entity';
import { ID } from 'src/common/types/type';

export class ParkRepository {
  constructor(
    @InjectRepository(ParkEntity)
    private repository: Repository<ParkEntity>,
  ) {}

  async getOneById(id: ID): Promise<ParkEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }
  async getOneByName(name: string): Promise<ParkEntity | undefined> {
    return await this.repository.findOneBy({name});
  }
  async getAll(): Promise<ParkEntity[]> {
    return await this.repository.find();
  }
  async createPark(entity: ParkEntity): Promise<ParkEntity> {
    return await this.repository.save(entity);
  }
  async updatePark(entity: ParkEntity, id: ID): Promise<ParkEntity> {
    const data = await this.repository.update(id,entity);
    return data.raw
  }
  async deletePark(entity: ParkEntity): Promise<ParkEntity> {
    return await this.repository.remove(entity);
  }
}
