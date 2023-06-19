import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async createUserDB(@Body() dataUser: CreateUserDto) {
  //   return await this.userService.createUser(dataUser);
  // }

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  //TODO add class transform
  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      return await this.userService.get(Number(id));
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.userService.update(Number(id), userData);
  }

  // @Get('order')
  // async createOrderDb() {
  //   return await this.userService.createOrder();
  // }

  // @Get('join')
  // async getJoinOrder() {
  //   return await this.userService.getJoinOrder();
  // }

  // @Get(':email')
  // async getUserInfo(@Param('email') email: CreateUserDto) {
  //   try {
  //     return await this.userService.get(email);
  //   } catch (error) {
  //     console.log(
  //       `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
  //       error,
  //     );
  //   }
  // }

  // @Put()
  // async updateUser(@Body() dataUser: CreateUserDto) {
  //   try {
  //     return await this.userService.update(dataUser);
  //   } catch (error) {
  //     console.log(
  //       `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
  //       error,
  //     );
  //   }
  // }

  //TODO add class transform
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.delete(Number(id));
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
        error,
      );
    }
  }
}
