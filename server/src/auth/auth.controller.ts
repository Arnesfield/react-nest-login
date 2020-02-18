import { Controller, Post, Inject, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';
import { LoginUserDto } from '../user/dto/login-user-dto';

@Controller('auth')
export class AuthController {
  @Inject('AuthService') private readonly authService: AuthService;

  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body() dto: LoginUserDto): Promise<User> {
    return await this.authService.login(dto);
  }
}
