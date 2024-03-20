import { ResData } from 'src/lib/resData';
import { CreateUserDto, LoginDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
// import { UserEntity } from 'src/modules/users/entities/user.entity';
// import { LoginDto, RegisterDto } from '../dto/auth.dto';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(dto: LoginDto): Promise<ResData<ILoginData>>;
  register(dto: CreateUserDto): Promise<ResData<ILoginData>>;
}
