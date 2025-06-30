import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/core/entity/user.entity";
import { TokenService } from "src/common/jwt/jwt-gen-get";
import { MailerService } from "@nestjs-modules/mailer";
import { MailModule } from "src/infrastructure/lib/mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailerService],
})
export class AuthModule {}
