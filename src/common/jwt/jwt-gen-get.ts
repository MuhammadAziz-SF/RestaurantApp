import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "../../config";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken = async (payload: object) => {
    return await this.jwtService.signAsync(payload, {
      secret: config.ACCESS_TOKEN_KEY,
      expiresIn: config.ACCESS_TOKEN_TIME,
    });
  };

  generateRefreshToken = async (payload: object) => {
    return await this.jwtService.signAsync(payload, {
      secret: config.REFRESH_TOKEN_KEY,
      expiresIn: config.REFRESH_TOKEN_TIME,
    });
  };

  decodejwt = async (req: Request) => {
    try {
      const authHeaders = req.headers.authorization;
      const token = authHeaders?.split(" ")[1];

      if (!token) {
        throw new UnauthorizedException("No token provided!");
      }

      const decodedToken = this.jwtService.decode(token);
      if (!decodedToken) {
        throw new UnauthorizedException("Invalid token!");
      }

      return decodedToken;
    } catch (error) {
      return;
    }
  };
}
