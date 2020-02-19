import { Request } from 'express';
import { Controller, Post, UseGuards, Req, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token-dto';

@Controller('auth')
export class AuthController {
  @Inject('AuthService') private readonly authService: AuthService;

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request: Request): Promise<AuthTokenDto> {
    return this.authService.login(request.user as User);
  }
}
