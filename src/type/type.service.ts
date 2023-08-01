import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { Group } from '../group/entities/group.entity';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async createType(group_id: string, name: string) {
    try {
      const grp = await this.groupRepository.findOneByOrFail({
        id: group_id,
      });

      const type = await this.typeRepository.create({
        type_name: name,
        group: grp,
      });

      const newType = await this.typeRepository.save(type);

      return { status: 200, data: newType };
    } catch (err) {
      console.error('ERROR', err);
      return { status: 400, data: err };
    }
  }

  async findTypes() {
    try {
      return await this.typeRepository
        .createQueryBuilder('type')
        .select(['type.type_name', 'type.id'])
        .leftJoinAndSelect('type.group', 'group')
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  async findType(id: string): Promise<{ status: number; data: Type | string }> {
    try {
      const data = await this.typeRepository
        .createQueryBuilder('type')
        .select(['type.type_name', 'type.id'])
        .where('type.id = :id', { id: id })
        .leftJoinAndSelect('type.group', 'group')
        .getOneOrFail();
      return { status: 200, data: data };
    } catch (err) {
      console.error('ERROR: ', err);
      return { status: 400, data: err };
    }
  }

  async delete(id: string) {
    const check = await this.productsService.getAllProductFromType(id);
    if (check.length !== 0) {
      return {
        status: 400,
        data: {
          msg: 'У этого типа есть связанные товары, перед удалением типа товара, удалите сначала все связанные товары',
          products: check,
        },
      };
    }
    const data = await this.typeRepository
      .createQueryBuilder('type')
      .delete()
      .from(Type)
      .where('id = :id', { id: id })
      .execute();

    return { status: 200, data: data };
  }

  async update(data: UpdateTypeDto) {
    const updateData = await this.typeRepository
      .createQueryBuilder('type')
      .update(Type)
      .set({ type_name: data.type_name })
      .where('id = :id', { id: data.id })
      .execute();

    if (updateData.affected === 0) {
      return { status: 404, data: 'Error. Type not Update. Type not found' };
    }
    return { status: 200, data: updateData };
  }
}
