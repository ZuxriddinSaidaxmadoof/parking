import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { JwtService } from "@nestjs/jwt"
import { ResData } from 'src/lib/resData';
import { BadRequestException } from '@nestjs/common/exceptions';


@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject("UserService")private readonly userService: UserService,
  private jwtService: JwtService,
  ){}
  async register(createAuthDto: CreateUserDto) {
    const {data: createdUser} = await this.userService.create(createAuthDto);
    const token = await this.jwtService.signAsync({id: createdUser.id})
    return new ResData<ILoginData>("Successfully registered", 201, {user: createdUser, token});
  }

  async login(loginDto: LoginDto) {
    const {data: findUser} = await this.userService.findOneByNumber(loginDto.phoneNumber);
    if(loginDto.password !== findUser.password){
      throw new BadRequestException("Wrong password")
    }
    const token = await this.jwtService.signAsync({id: findUser.id})
    return new ResData<ILoginData>("Successfully registered", 201, {user: findUser, token});
  }

}
