import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async createGroup(group_name: string) {
    try {
      const group = await this.groupRepository.create({
        group_name: group_name,
      });
      return await this.groupRepository.save(group);
    } catch (err) {
      throw err;
    }
  }

  async findGroups() {
    try {
      return await this.groupRepository
        .createQueryBuilder('group')
        .select(['group.id', 'group.group_name'])
        .leftJoinAndSelect('group.types', 'type')
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  async findFewGroups(arrID: string[]) {
    try {
      return await this.groupRepository
        .createQueryBuilder('group')
        .select(['group.id', 'group.group_name'])
        .where('group.id IN (:...id)', { id: arrID })
        .leftJoinAndSelect('group.types', 'type')
        .getMany();
    } catch (err) {
      throw err;
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

  async delete(id: string) {
    try {
      const groupDelete = await this.groupRepository
        .createQueryBuilder('group')
        .delete()
        .from(Group)
        .where('id = :id', { id: id })
        .execute();
      if (groupDelete.affected === 0) {
        return {
          status: 404,
          data: 'Error. Group not Update. Group not found',
        };
      }
      return { status: 200, data: groupDelete };
    } catch (err) {
      return { status: 400, data: err.sqlMessage };
    }
  }

  async update(data: CreateGroupDto) {
    const updateGroup = await this.groupRepository
      .createQueryBuilder('group')
      .update(Group)
      .set({ group_name: data.group_name })
      .where('id = :id', { id: data.id })
      .execute();

    if (updateGroup.affected === 0) {
      return { status: 404, data: 'Error. Group not Update. Group not found' };
    }
    return { status: 200, data: updateGroup };
  }
}
