import { LoginUserDto } from './dto/login-user-dto';

export class User {
  id: number;
  username: string;
  password: string;

  constructor(dto?: LoginUserDto) {
    if (dto) {
      this.username = dto.username;
      this.password = dto.password;
    }
  }
}
