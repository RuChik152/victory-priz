import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsMiddleware } from './products.middleware';
import { Group } from '../group/entities/group.entity';
import { Type } from '../type/entities/type.entity';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [
    forwardRef(() => TypeModule),
    TypeOrmModule.forFeature([Product, Group, Type]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ProductsMiddleware).forRoutes(ProductsController);
  }
}
