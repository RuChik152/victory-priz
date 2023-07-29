import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsMiddleware } from './products.middleware';
import { Group } from './entities/group.entity';
import {Type} from "./entities/type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Group, Type])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ProductsMiddleware).forRoutes(ProductsController);
  }
}
