import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenMiddleware } from './token.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TokenMiddleware).forRoutes(TokenController);
  }
}
