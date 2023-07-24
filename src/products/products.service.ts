import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto, image: any) {
    try {
      const prod = {
        ...product,
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

    await this.productRepository.save(product);

    const { image_data, ...prod } = await this.productRepository.findOne({
      where: {
        art: art,
      },
    });
    return { ...prod };
  }

  async getCups() {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.name',
          'product.presentation_name',
          'product.art',
          'product.price',
          'product.description',
          'product.image_link',
          'product.type',
          'product.group',
        ])
        .where({ group: 'cups' })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async getMedals() {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.name',
          'product.presentation_name',
          'product.art',
          'product.price',
          'product.description',
          'product.image_link',
          'product.type',
          'product.group',
        ])
        .where({ group: 'medals' })
        .getMany();
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
