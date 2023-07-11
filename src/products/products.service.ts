import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as process from 'process';

type NewProductType = {
  image: string;
  art: string;
  price: number;
  name: string;
  presentation_name: string;
  description: string;
};
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto, image: any) {
    try {
      const prod = {
        name: product.name,
        presentation_name: product.presentation_name,
        art: product.art,
        price: Number(product.price),
        description: product.description,
        image: product.image,
        image_data: image.buffer,
      };

      const prodCreate = await this.productRepository.create(prod);

      const prodCreateNew = await this.productRepository.save(prodCreate);
      return {
        id: prodCreateNew.id,
        name: prodCreateNew.name,
        presentation_name: prodCreateNew.presentation_name,
        art: prodCreateNew.art,
        price: prodCreateNew.price,
        description: prodCreateNew.description,
        image: `${process.env.HOST}/products/image/${prodCreateNew.art}`,
      };
    } catch (err) {
      throw err;
    }
  }

  async getImage(art: string) {
    const image = await this.productRepository.findOne({
      where: {
        art: art,
      },
    });
    return image.image_data;
  }

  async get() {
    try {
      const arr = [];
      const products = await this.productRepository.find();
      console.log(products);

      for await (const value of products) {
        arr.push({
          id: value.id,
          name: value.name,
          presentation_name: value.presentation_name,
          description: value.description,
          art: value.art,
          price: value.price,
          image: `${process.env.HOST}/products/image/${value.art}`,
        });
      }

      return arr;
    } catch (err) {
      throw err;
    }
  }

  async getProduct(art: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          art: art,
        },
      });
      return {
        id: product.id,
        name: product.name,
        presentation_name: product.presentation_name,
        art: product.art,
        price: product.price,
        description: product.description,
        image: `${process.env.HOST}/products/image/${product.art}`,
      };
    } catch (err) {
      throw err;
    }
  }

  async update(data: CreateProductDto, image: any, art: string) {
    console.log('UPDATE data: ', data);
    console.log('UPDATE image: ', image);
    console.log('UPDATE art: ', art);

    const product = await this.productRepository.findOne({
      where: {
        art: art,
      },

    });

    const update = await this.productRepository.save({ ...product, ...data });
  }
}
