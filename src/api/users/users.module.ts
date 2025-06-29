
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ShiftModule } from '../shifts';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
  TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => ShiftModule),
  ],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UserModule {}
