import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Order } from '../user/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create() {
    //code
  }

  async update() {
    //code
  }

  async delete() {
    //code
  }

  async get() {
    //code
  }

  async getAll() {
    try {
      return await this.ordersRepository.find();
    } catch (err) {
      throw err;
    }
  }
}
