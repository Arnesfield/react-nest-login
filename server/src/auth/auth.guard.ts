import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject('AuthService') private readonly authService: AuthService;

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.authService.attempt(request.body as LoginUserDto);
  }
}
