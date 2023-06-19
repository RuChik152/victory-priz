import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes(AuthController);
  }
}
