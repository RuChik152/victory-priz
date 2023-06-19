import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Order } from '../user/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
