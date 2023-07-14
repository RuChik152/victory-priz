import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as process from 'process';
import * as pug from 'pug';
import { UpdateProductDto } from './dto/update-product.dto';

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
        type: product.type,
        group: product.group,
        image_data: image.buffer,
      };

      const prodCreate = await this.productRepository.create(prod);

      const { image_data, ...data } = await this.productRepository.save(
        prodCreate,
      );
      return {
        status: 200,
        data: { ...data },
      };
    } catch (error) {
      console.log(`[ ${new Date()} ], ERROR: `, error);
      return { status: 400, data: error.sqlMessage };
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

      for await (const { image_data, ...data } of products) {
        arr.push({ ...data });
      }

      return arr;
    } catch (err) {
      throw err;
    }
  }

  async getProduct(art: string) {
    try {
      const { image_data, ...data } = await this.productRepository.findOne({
        where: {
          art: art,
        },
      });
      return { ...data };
    } catch (err) {
      throw err;
    }
  }

  async update(data: UpdateProductDto, image: any, art: string) {
    const product = await this.productRepository.findOne({
      where: {
        art: art,
      },
    });
    const updateDataProduct = {
      ...data,
      image_data: image !== undefined ? image.buffer : product.image_data,
    };

    for (const el in product) {
      for (const value in updateDataProduct) {
        if (el === value) {
          product[el] = updateDataProduct[value];
        }
      }
    }

    const { image_data, ...prod } = await this.productRepository.save(product);
    return { ...prod };
  }

  async getCups() {
    try {
      return await this.productRepository.findOne({
        where: {
          type: 'cups',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getMedals() {
    try {
      return await this.productRepository.findOne({
        where: {
          type: 'medals',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(art: string) {
    try {
      return await this.productRepository.delete({ art: art });
    } catch (error) {
      throw error;
    }
  }

  async deleteArr(arr: string[]) {
    try {
      const list = [];

      for await (const value of arr) {
        const product = await this.productRepository.delete({ art: value });
        list.push(product);
      }

      return list;
    } catch (error) {
      throw error;
    }
  }
}
