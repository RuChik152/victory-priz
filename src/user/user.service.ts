import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async delete(userData: CreateUserDto) {
    //code
  }

  async get(userData: CreateUserDto) {
    //code
  }

  async update(userData: CreateUserDto) {
    //code
  }
}
