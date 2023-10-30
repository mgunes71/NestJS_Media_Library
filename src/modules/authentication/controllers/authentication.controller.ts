import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { Request } from 'express';
import { AuthenticatedUser } from '../decorators/authenticated-user.decorator';
import { UserAuthGuard } from '../guards/auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Req() request: Request, @Body() loginUserDto: any) {
    return await this.authenticationService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authenticationService.register(registerDto);
  }

  @UseGuards(UserAuthGuard)
  @Get('session')
  async session(@AuthenticatedUser() user: any) {
    return user;
  }
}
