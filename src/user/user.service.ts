import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Usergroup } from './entities/usergroup.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Usergroup)
    private usergroupRepository: Repository<Usergroup>,
  ) {}

  async getAll() {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.name'])
      .leftJoinAndSelect('user.usergroups', 'usergroups')
      .getMany();
  }

  async get(user_id: number): Promise<User> {
    try {
      return await this.usersRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.email', 'user.name'])
        .leftJoinAndSelect('user.usergroups', 'usergroups')
        .where('user.id = :id', { id: user_id })
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  async getOneGroup(group_id: string) {
    try {
      return await this.usergroupRepository
        .createQueryBuilder('usergroup')
        .where('usergroup.id = :id', { id: group_id })
        .leftJoinAndSelect('usergroup.users', 'users')
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, dataUser: UpdateUserDto) {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    for (const value in dataUser) {
      user[value] = dataUser[value];
    }
    return await this.usersRepository.save(user);
  }

  async delete(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }

  async getAllUserGroup() {
    try {
      // return await this.usergroupRepository
      //   .createQueryBuilder('usergroup')
      //   .select('usergroup.id', 'usergroup.name')
      //   .getMany();
      return await this.usergroupRepository
        .createQueryBuilder('usegroup')
        .getMany();
    } catch (errr) {
      throw errr;
    }
  }

  async createUserGroup(data: CreateUsergroupDto) {
    try {
      return await this.usergroupRepository
        .createQueryBuilder('usegroup')
        .insert()
        .into(Usergroup)
        .values({ ...data })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async updateUserGroup(data: UpdateUsergroupDto) {
    try {
      return await this.usergroupRepository
        .createQueryBuilder('usegroup')
        .update(Usergroup)
        .set({ name: data.newName })
        .where('id = :id', { id: data.id })
        .execute();
    } catch (err) {
      throw err;
    }
  }

  async deleteUserGroup(data: UpdateUsergroupDto) {
    try {
      return await this.usergroupRepository
        .createQueryBuilder('usegroup')
        .delete()
        .from(Usergroup)
        .where('id = :id', { id: data.id })
        .execute();
    } catch (err) {
      throw err;
    }
  }

  async addGroupToUser(user_id: number, group_id: string) {
    try {
      const group = await this.usergroupRepository
        .createQueryBuilder('usergroup')
        .where('usergroup.id = :id', { id: group_id })
        .leftJoinAndSelect('usergroup.users', 'users')
        .getOne();

      const user = await this.usersRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.email', 'user.name'])
        .leftJoinAndSelect('user.usergroups', 'usergroups')
        .where('user.id = :id', { id: user_id })
        .getOne();

      user.usergroups.push(group);
      group.users.push(user);

      await this.usersRepository.save(user);
      await this.usergroupRepository.save(group);
      return true;
    } catch (err) {}
  }

  // async createUser(data: CreateUserDto): Promise<User> {
  //   const newUser = await this.usersRepository.create(data);
  //   return await this.usersRepository.save(newUser);
  // }

  // async createOrder() {
  //   const user = await this.usersRepository.create({ id: 2 });
  //   const order = await this.ordersRepository.create({
  //     user,
  //     title: 'PETR ORDER',
  //     descriptions: 'FIRST PETR ORDER',
  //   });
  //   return await this.ordersRepository.save(order);
  // }

  // async getJoinOrder() {
  //   const user = await this.usersRepository
  //     .createQueryBuilder('user')
  //     .select(['user.id', 'user.name', 'user.email'])
  //     .where({ id: 2 })
  //     .leftJoinAndSelect('user.orders', 'order')
  //     .getMany();
  //
  //   return user;
  // }
}
