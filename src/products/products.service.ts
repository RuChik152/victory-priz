import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { Group } from '../group/entities/group.entity';
import { Type } from '../type/entities/type.entity';
import { rethrow } from '@nestjs/core/helpers/rethrow';
import { TypeModule } from '../type/type.module';
import { TypeService } from '../type/type.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @Inject(forwardRef(() => TypeService))
    private typeService: TypeService,
  ) {}

  async create(product: CreateProductDto, image: any) {
    try {
      const { type_id, ...product_data } = product;

      const typ = await this.typeService.findType(type_id);
      if (typ.data instanceof Type) {
        const prod = {
          ...product_data,
          type: typ.data,
          group: typ.data.group,
          image_data: image.buffer,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const prodCreate = await this.productRepository.create(prod);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { image_data, ...data } = await this.productRepository.save(
          prodCreate,
        );
        return {
          status: 200,
          data: { ...data },
        };
      }
      return {
        status: 400,
        data: typ.data,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      return await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.id',
          'product.name',
          'product.tag',
          'product.presentation_name',
          'product.art',
          'product.price',
          'product.description',
          'product.image_link',
          'product.sales',
          'product.sales_percent',
        ])
        .leftJoinAndSelect('product.type', 'type')
        .leftJoinAndSelect('product.group', 'group')
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  async getProduct(art: string) {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .select([
          'product.id',
          'product.name',
          'product.tag',
          'product.presentation_name',
          'product.art',
          'product.price',
          'product.description',
          'product.image_link',
          'product.sales',
          'product.sales_percent',
        ])
        .where('product.art = :art', { art: art })
        .leftJoinAndSelect('product.type', 'type')
        .leftJoinAndSelect('product.group', 'group')
        .getOne();
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

  async getAllProductFromGroup(id: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.tag',
        'product.presentation_name',
        'product.art',
        'product.price',
        'product.description',
        'product.image_link',
        'product.sales',
        'product.sales_percent',
      ])
      .where('product.groupId = :groupId', { groupId: id })
      .leftJoinAndSelect('product.type', 'type')
      .leftJoinAndSelect('product.group', 'group')
      .getMany();
  }

  async getAllProductFromType(id: string) {
    return await this.productRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.tag',
        'product.presentation_name',
        'product.art',
        'product.price',
        'product.description',
        'product.image_link',
        'product.sales',
        'product.sales_percent',
      ])
      .where('product.typeId = :typeId', { typeId: id })
      .leftJoinAndSelect('product.type', 'type')
      .leftJoinAndSelect('product.group', 'group')
      .getMany();
  }

  // async findGroup(id: string) {
  //   try {
  //     return await this.groupRepository
  //       .createQueryBuilder('group')
  //       .select(['group.id', 'group.group_name'])
  //       .where('group.id = :id', { id: id })
  //       .leftJoinAndSelect('group.types', 'type')
  //       .getOne();
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  //
  // async findType(id: string) {
  //   try {
  //     const type = await this.typeRepository
  //       .createQueryBuilder('type')
  //       .select(['type.type_name', 'type.id'])
  //       .where('type.id = :id', { id: id })
  //       .leftJoinAndSelect('type.group', 'group')
  //       .getOne();
  //     console.log('test: ', typeof type);
  //     return type;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
}
