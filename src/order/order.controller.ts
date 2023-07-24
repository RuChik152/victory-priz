import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrder() {
    try {
      return await this.orderService.getAll();
    } catch (err) {
      throw err;
    }
  }
}
