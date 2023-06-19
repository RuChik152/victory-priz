import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}



  async getAll() {
    return this.usersRepository.find();
  }



  async get(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
      });
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
