import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenMiddleware } from './token.middleware';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TokenMiddleware).forRoutes(TokenController);
  }
}
