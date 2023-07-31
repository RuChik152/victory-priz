import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import { Group } from '../group/entities/group.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
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

      return await this.typeRepository.save(type);
    } catch (err) {
      throw err;
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
