import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShiftEntity } from "../../core/entity/shifts.entity";
import { ShiftService } from "./shift.service";
import { ShiftController } from "./shifts.controller";
import { UserEntity } from "../../core/entity/user.entity";
import { UserModule } from "../users";

@Module({
  imports: [
    TypeOrmModule.forFeature([ShiftEntity, UserEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
  exports: [ShiftService],
})
export class ShiftModule {}
