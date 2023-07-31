import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Group } from '../group/entities/group.entity';
import { Type } from '../type/entities/type.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async create(product: CreateProductDto, image: any) {
    try {
      const { group_id, type_id, ...product_data } = product;
      const grp = await this.findGroup(group_id);
      const typ = await this.findType(type_id);
      const prod = {
        ...product_data,
        group: grp,
        type: typ,
        image_data: image.buffer,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const prodCreate = await this.productRepository.create(prod);

      //TODO
      const { image_data, ...data }: any = await this.productRepository.save(
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

  async findGroup(id: string) {
    try {
      return await this.groupRepository
        .createQueryBuilder('group')
        .select(['group.id', 'group.group_name'])
        .where('group.id = :id', { id: id })
        .leftJoinAndSelect('group.types', 'type')
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  async findType(id: string) {
    try {
      return await this.typeRepository
        .createQueryBuilder('type')
        .select(['type.type_name', 'type.id'])
        .where('type.id = :id', { id: id })
        .leftJoinAndSelect('type.group', 'group')
        .getOne();
    } catch (err) {
      throw err;
    }
  }
}
