import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ProductsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('MIDDLEWARE ACTION');
    next();
  }
}
