import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(
    @Inject('UserService') private readonly userService: UserService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { params } = context.switchToHttp().getRequest();
    return this.userService.checkExists(params.id);
  }
}
