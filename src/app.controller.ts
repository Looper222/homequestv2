import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Req() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  // Logowanie nie działa, trzeba sprawdzić i przerobić po swojemu tak, żeby działało

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
