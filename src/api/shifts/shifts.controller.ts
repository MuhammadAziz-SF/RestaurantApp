import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ShiftService } from "./shift.service";
import { CreateShiftDto } from "./dto/create-shift.dto";
import { UpdateShiftDto } from "./dto/update-shift.dto";
import { RolesGuard } from "../../common/guard/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common";
import { JwtGuard } from "src/common/guard/jwt.guard";

@Controller("shifts")
@UseGuards(RolesGuard)
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN)
  create(@Body() dto: CreateShiftDto) {
    return this.shiftService.create(dto);
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN)
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.shiftService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN)
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateShiftDto) {
    return this.shiftService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.shiftService.remove(id);
  }
}
