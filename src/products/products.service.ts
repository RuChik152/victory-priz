import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

type NewProductType = {

};
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto) {
    try {
      const createOrder: NewProductType = Object.assign({}, { ...product });
      const order = await this.productRepository.create(createOrder);
    } catch (err) {
      throw err;
    }
  }

  // findAll() {
  //   return `This action returns all products`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }
  //
  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
