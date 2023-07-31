import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {ApiConsumes, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async createGroup(@Body('group_name') group_name: string) {
    try {
      return await this.groupService.createGroup(group_name);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async getGroups() {
    try {
      return await this.groupService.findGroups();
    } catch (err) {
      throw err;
    }
  }

  @Get('few')
  async findFewGroups(@Body() arrID: string[]) {
    try {
      return await this.groupService.findFewGroups(arrID);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async findGroup(@Param('id') id: string) {
    try {
      return await this.groupService.findGroup(id);
    } catch (err) {
      throw err;
    }
  }
}
