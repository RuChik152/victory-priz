import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';
import { UserGuard } from './user.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get('group/:id')
  async getOneUserGroup(@Param() data: UpdateUsergroupDto) {
    console.log(data);
    return await this.userService.getOneGroup(data.id);
  }

  @Get('group')
  async getUserGroup() {
    return await this.userService.getAllUserGroup();
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

  @UseGuards(UserGuard)
  @Put(':user_id/group/:group_id')
  async addGroupToUser(
    @Param('user_id') user_id: string,
    @Param('group_id') group_id: string,
  ) {
    console.log('update', user_id, group_id);
    return await this.userService.addGroupToUser(Number(user_id), group_id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.userService.update(Number(id), userData);
  }

  @ApiParam({
    name: 'id',
    description: 'ID user group for deleting',
  })
  @UseGuards(UserGuard)
  @Delete('group/:id')
  async deleteUserGroup(@Param() data: UpdateUsergroupDto) {
    return await this.userService.deleteUserGroup(data);
  }

  //TODO add class transform
  @Delete(':id')
  @UseGuards(UserGuard)
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

  @ApiParam({
    name: 'id',
    description: 'name current user group',
    type: 'string',
  })
  @ApiParam({
    name: 'newName',
    description: 'New name for user group',
  })
  @UseGuards(UserGuard)
  @Put('group/:id/:newName')
  async updateUserGroup(@Param() data: UpdateUsergroupDto) {
    return await this.userService.updateUserGroup(data);
  }

  @Post('group/:name')
  async createGroup(@Param() data: CreateUsergroupDto) {
    return await this.userService.createUserGroup(data);
  }
}
