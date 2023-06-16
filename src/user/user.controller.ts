import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async getUserInfo(@Param('email') email: CreateUserDto) {
    try {
      return await this.userService.get(email);
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
        error,
      );
    }
  }

  @Put()
  async updateUser(@Body() dataUser: CreateUserDto) {
    try {
      return await this.userService.update(dataUser);
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
        error,
      );
    }
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: CreateUserDto) {
    try {
      return await this.userService.delete(email);
    } catch (error) {
      console.log(
        `[${new Date().toJSON()}] ERROR UserController GetUserInfo: `,
        error,
      );
    }
  }


}
