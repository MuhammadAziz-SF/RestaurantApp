import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfirmLoginDto } from "./dto/confirm-login.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginDto } from "../users/dto/login.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("super-admin-login")
  superAdminLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.superAdminLogin(loginDto, res);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.login(loginDto, res);
  }

  @Post("confirm-login")
  confirmLogin(@Body() confirmLogin: ConfirmLoginDto, @Res() res: Response) {
    return this.authService.confirmLogin(confirmLogin, res);
  }

  @Post("logout")
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
