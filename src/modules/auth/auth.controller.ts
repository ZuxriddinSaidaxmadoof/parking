import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.register(createAuthDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
