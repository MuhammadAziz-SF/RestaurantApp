
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ShiftEntity } from '../../core/entity/shifts.entity';
import { ShiftService } from './shift.service';
import { ShiftController } from './shifts.controller';
import { UserEntity} from '../../core/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
  TypeOrmModule.forFeature([ShiftEntity, UserEntity]),
  ],
  controllers: [ShiftController],
  providers: [ShiftService, JwtService],
  exports: [ShiftService],
})
export class ShiftModule {}
