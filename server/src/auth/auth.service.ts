import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { LoginUserDto } from '../user/dto/login-user-dto';

@Injectable()
export class AuthService {
  private user: User;

  constructor() {
    this.user = new User({
      username: 'test',
      password: 'password'
    });
    this.user.id = 1;
  }

  public async attempt(dto: LoginUserDto): Promise<boolean> {
    const { username, password } = this.user;
    const attempt = dto.username === username && dto.password === password;

    await new Promise(resolve => setTimeout(resolve, 1000)); // test

    if (!attempt) {
      throw new UnauthorizedException('Invalid username or password.');
    }
    return attempt;
  }

  public async login(dto: LoginUserDto) {
    return (await this.attempt(dto)) && this.user;
  }
}
