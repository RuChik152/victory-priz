import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CONNECTION from './db.connection';
import { DataSource } from 'typeorm';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    UserModule,
    TokenModule,
    TypeOrmModule.forRoot({
      ...CONNECTION,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
