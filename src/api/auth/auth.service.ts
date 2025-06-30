import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Inject, Injectable } from "@nestjs/common";
import { ConfirmLoginDto } from "./dto/confirm-login.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "src/common/jwt/jwt-gen-get";
import { MailService } from "src/infrastructure/lib/mail/mail.service";
import { LoginDto } from "../users/dto/login.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { UserRole } from "src/common";
import { BcryptEncryption } from "../../infrastructure/lib/bcrypt";
import { JwtPayload } from "src/infrastructure/lib/baseService/interface";
import {
  writeToCookie,
  clearCookie,
} from "src/infrastructure/lib/exeption/cookie-response";
import { successRes } from "src/infrastructure/lib/exeption/success-response";
import { errorCatch } from "src/infrastructure/lib/exeption/error-catch";
import { UserEntity } from "src/core/entity/user.entity";
import { UserRepository } from "src/core/repository";
import { BaseService } from "src/infrastructure/lib/baseService";
import { CreateUserDto } from "../users/dto";
import { DeepPartial } from "typeorm";
import { generateOTP } from "src/infrastructure/lib/otp/otp-gen";
import { Response } from "express";

@Injectable()
export class AuthService extends BaseService<
  CreateUserDto,
  DeepPartial<UserEntity>
> {
  constructor(
    @InjectRepository(UserEntity) repository: UserRepository,
    @Inject(CACHE_MANAGER)
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly cacheManager: Cache,
  ) {
    super(repository);
  }

  async superAdminLogin(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const admin = await this.getRepository.findOne({
        where: { email },
      });

      if (!admin) {
        throw new BadRequestException("Invalid Credentials");
      }

      if (admin.role !== UserRole.SUPER_ADMIN) {
        throw new UnauthorizedException(
          "Access denied. SuperAdmin access required!",
        );
      }

      const isValidPassword = await BcryptEncryption.compare(
        password,
        admin.hashedPassword,
      );

      if (!isValidPassword) {
        throw new UnauthorizedException("Invalid credentials!");
      }

      const payload: JwtPayload = {
        id: admin.id,
        role: admin.role,
        fullName: admin.fullName,
      };

      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken =
        await this.tokenService.generateRefreshToken(payload);
      writeToCookie(res, "refreshToken", refreshToken);

      return res.status(200).json(successRes({ accessToken }, 200));
    } catch (error) {
      return errorCatch(error);
    }
  }

  async login(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;

      const admin = await this.getRepository.findOne({ where: { email } });

      if (!admin) {
        throw new BadRequestException("Invalid credentials");
      }

      const isPasswordValid = await BcryptEncryption.compare(
        password,
        admin.hashed_password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const otp = generateOTP();
      await this.mailService.sendOtp(admin.email, String(otp));
      await this.cacheManager.set(email, otp, 300000);
      return res.status(200).json(successRes(email, 200));
    } catch (error) {
      return errorCatch(error);
    }
  }

  async confirmLogin(
    confirmSignInAdminDto: ConfirmLoginDto,
    res: Response,
  ): Promise<object> {
    try {
      const { email, otp } = confirmSignInAdminDto;
      const hasUser = await this.cacheManager.get(email);
      if (!hasUser || hasUser != otp) {
        throw new BadRequestException("OTP expired");
      }
      const admin = await this.getRepository.findOne({ where: { email } });
      const { id, role, status } = admin?.dataValues;
      const payload = { id, role, status };
      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken =
        await this.tokenService.generateRefreshToken(payload);
      writeToCookie(res, "refreshTokenAdmin", refreshToken);
      return res.status(200).json(successRes({ accessToken }, 200));
    } catch (error) {
      return errorCatch(error);
    }
  }

  async logout(res: Response) {
    try {
      clearCookie(res, "refreshTokenAdmin");
      return res.status(200).json(successRes(null, 200));
    } catch (error) {
      return errorCatch(error);
    }
  }
}
