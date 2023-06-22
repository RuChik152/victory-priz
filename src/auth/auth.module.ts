import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { resolve } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: 'smtp.yandex.ru',
          port: 465,
          secure: true,
          auth: {
            user: 'web-studioi@yandex.ru',
            pass: 'bdgqaqxthzpsuuom',
          },
        },
        defaults: {
          from: `web-studioi@yandex.ru`,
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes(AuthController);
  }
}
