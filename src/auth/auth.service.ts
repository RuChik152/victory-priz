import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(dataUser: CreateAuthDto) {
    try {
      const user = await this.userRepository.create(dataUser);
      return await this.userRepository.save(user);
    } catch (err) {
      console.log(`[${new Date().toJSON()}] ERROR AuthService Create: `, err);
      throw err;
    }
  }

  async auth(dataUser: CreateAuthDto) {
    //code
  }
}
