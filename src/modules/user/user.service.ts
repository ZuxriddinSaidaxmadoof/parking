import { Injectable } from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { ResData } from 'src/lib/resData';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<ResData<UserEntity>> {
    const newEntity = new UserEntity();
    newEntity.phoneNumber = createUserDto.phoneNumber;
    newEntity.password = createUserDto.password;
    newEntity.balance = createUserDto.balance;
    newEntity.role = createUserDto.role;

    const defineNumberExist = await this.repository.findOneBy({"phoneNumber": newEntity.phoneNumber});
    if(defineNumberExist){
      throw new BadRequestException(" phone number already used")
    }

    const createdUser = await this.repository.save(newEntity);
    return new ResData("user created successfully", 201, createdUser)
  }

  async findAll() {
    
    const allUsers = await this.repository.find();
    return new ResData("All users", 200, allUsers);
  }

  async findOne(id: number) {
    const foundUser = await this.repository.findOneBy({id})
    if(!foundUser){
      throw new NotFoundException("User not found by id")
    }
    return new ResData("One user by id", 200, foundUser);
  }

  async findOneByNumber(number: string) {
    const foundUser = await this.repository.findOneBy({phoneNumber: number})
    if(!foundUser){
      throw new NotFoundException("User not found by phone number")
    }
    return new ResData("One user by phone number", 200, foundUser);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const {data: foundUser} = await this.findOne(id);
    const deletedUser  = await this.repository.remove(foundUser);
    return new ResData("User deleted successfully", 200, deletedUser);
  }
}
