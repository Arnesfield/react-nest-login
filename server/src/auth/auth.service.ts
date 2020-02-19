import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthTokenDto } from './dto/auth-token-dto';

@Injectable()
export class AuthService {
  @Inject() private readonly userService: UserService;
  @Inject() private readonly jwtService: JwtService;

  public async attemptLoginUser(dto: LoginUserDto): Promise<User> {
    try {
      const { username, password } = dto;
      const user: User = await this.userService.getOneWhere({
        username,
        deletedAt: null
      });

      const result = user && (await user.comparePassword(password));
      if (!result) throw new Error();
      return user;
    } catch (error) {
      return null;
    }
  }

  public async login(user: User): Promise<AuthTokenDto> {
    // guard handles the attempts
    const payload: object = { username: user.username, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.sign(payload)
    };
  }
}
