import { User } from '../../user/user.entity';

export class AuthTokenDto {
  user: User;
  accessToken: string;
}
