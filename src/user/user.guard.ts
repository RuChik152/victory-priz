import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = context.switchToHttp().getRequest().headers[
        'xxx-access-token'
      ];
      const decodeToken: any = jwt.verify(
        token,
        process.env.JWT_CONSTANT_ACCESS_TOKEN,
      );

      const verifyUserGroupToken: any = jwt.verify(
        decodeToken.usergroup,
        process.env.JWT_CONSTANT_CRYPT,
      );

      const group = verifyUserGroupToken.usergroup;
      for (const value of group) {
        if (value.name === 'root') {
          return true;
        }
      }
      return false;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
