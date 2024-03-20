import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService,
    {provide: "UserService", useClass: UserService}
  ],
  exports: [
    {provide: "UserService", useClass: UserService}
  ]
})
export class SharedModule {}
