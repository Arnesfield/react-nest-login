import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.attemptLoginUser({
      username,
      password
    } as LoginUserDto);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    return user;
  }
}
