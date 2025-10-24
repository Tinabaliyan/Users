// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomAuthGuard } from './custom-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body()
    body: {
      username: string;
      email: string;
      phoneNumber: string;
      password: string;
    },
  ) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    const tokenData = await this.authService.login(user);
    return {
      ...tokenData,
      user: user,
      message: 'Login successful',
    };
  }

  @UseGuards(CustomAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'This is a protected route',
      user: req.user,
    };
  }
}
