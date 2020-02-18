import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthService {
  @Inject() private readonly userService: UserService;

  public async attemptGetUser(dto: LoginUserDto): Promise<User> {
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
      throw new UnauthorizedException('Invalid username or password.');
    }
  }

  public async attempt(dto: LoginUserDto): Promise<boolean> {
    return !!(await this.attemptGetUser(dto));
  }

  public async login(dto: LoginUserDto): Promise<User> {
    return await this.attemptGetUser(dto);
  }
}
