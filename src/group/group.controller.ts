import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBadRequestResponse,
  ApiConsumes, ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Group } from './entities/group.entity';
import { Type } from '../type/entities/type.entity';
import { CreateTypeDto } from '../type/dto/create-type.dto';
import { Request, Response, NextFunction } from 'express';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Info to new Group product',
    schema: {
      type: 'object',
      properties: {
        group_name: {
          type: 'string',
          description: 'Group name',
          example: 'Название_Группы_1',
        },
        id: {
          type: 'string',
          description: 'ID Group',
          example: '749194fd-e887-4b17-88cc-18b54deaaec7',
        },
        type: {
          type: 'array',
          items: {
            $ref: getSchemaPath(CreateTypeDto),
          },
        },
      },
    },
  })
  async createGroup(@Body() data: CreateGroupDto) {
    try {
      return await this.groupService.createGroup(data.group_name);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Info to new Group product',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          group_name: {
            type: 'string',
            description: 'Group name',
            example: 'Название_Группы_1',
          },
          id: {
            type: 'string',
            description: 'ID Group',
            example: '749194fd-e887-4b17-88cc-18b54deaaec7',
          },
          type: {
            type: 'array',
            items: {
              $ref: getSchemaPath(CreateTypeDto),
            },
          },
        },
      },
    },
  })
  async getGroups() {
    try {
      return await this.groupService.findGroups();
    } catch (err) {
      throw err;
    }
  }

  @Get('few')
  @ApiResponse({
    status: 200,
    description: 'Info to new Group product',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          group_name: {
            type: 'string',
            description: 'Group name',
            example: 'Название_Группы_1',
          },
          id: {
            type: 'string',
            description: 'ID Group',
            example: '749194fd-e887-4b17-88cc-18b54deaaec7',
          },
          type: {
            type: 'array',
            items: {
              $ref: getSchemaPath(CreateTypeDto),
            },
          },
        },
      },
    },
  })
  async findFewGroups(@Body() arrID: string[]) {
    try {
      return await this.groupService.findFewGroups(arrID);
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Info to new Group product',
    schema: {
      type: 'object',
      properties: {
        group_name: {
          type: 'string',
          description: 'Group name',
          example: 'Название_Группы_1',
        },
        id: {
          type: 'string',
          description: 'ID Group',
          example: '749194fd-e887-4b17-88cc-18b54deaaec7',
        },
        type: {
          type: 'array',
          items: {
            $ref: getSchemaPath(CreateTypeDto),
          },
        },
      },
    },
  })
  async findGroup(@Param('id') id: string) {
    try {
      return await this.groupService.findGroup(id);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Success update data' })
  @ApiBadRequestResponse({ status: 404, description: 'Error update data' })
  async deleteGroup(@Param('id') id: string, @Res() res: Response) {
    const deleted = await this.groupService.delete(id);
    res.status(deleted.status).send(deleted.data);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Success update data' })
  @ApiNotFoundResponse({ status: 404, description: 'Error update data' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'You have entered incorrect data',
  })
  async updateGroup(@Body() data: CreateGroupDto, @Res() res: Response) {
    const update = await this.groupService.update(data);
    res.status(update.status).send(update.data);
  }
}
