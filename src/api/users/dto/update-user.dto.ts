import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { UserRole } from "../../../common/enum/base.enum";
import { IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  role: UserRole;
}
