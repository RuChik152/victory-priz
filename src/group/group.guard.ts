import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { DecodeType } from '../token/token.middleware';

@Injectable()
export class GroupGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = context.switchToHttp().getRequest().headers[
        'xxx-access-token'
      ];
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_CONSTANT_ACCESS_TOKEN);
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
