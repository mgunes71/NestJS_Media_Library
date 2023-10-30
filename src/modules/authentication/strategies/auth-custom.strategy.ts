import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-custom";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { UserModel } from "../../../shared/models/user.model";



@Injectable()
export class AuthCustomStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly userRepository: typeof UserModel;

  constructor(private jwtService: JwtService) {
    super();

    this.userRepository = UserModel;
  }

  async getAuthenticationToken(req: Request) {
    const authHeader = req.header('Authorization');
    if (!authHeader || authHeader.indexOf('Bearer ') === -1) {
      throw new UnauthorizedException();
    }

    const jwtToken = authHeader.replace('Bearer ', '');
    if (!jwtToken || jwtToken.trim() === '') {
      throw new UnauthorizedException();
    }

    return jwtToken;
  }

  async validate(req: Request) {
    const jwtToken =await this.getAuthenticationToken(req);

    const payload = await this.jwtService.verifyAsync(jwtToken).catch();

    if (!payload) {
      throw new UnauthorizedException('session is not valid');
    }

    const user = await UserModel.findByPk(payload.id);

    return user
  }

}
