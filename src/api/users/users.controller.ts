import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserRole } from "../../common/enum/base.enum";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtGuard } from "src/common/guard/jwt.guard";

@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Patch("role/:id")
  @Roles(UserRole.SUPER_ADMIN)
  updateRole(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateRole(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
