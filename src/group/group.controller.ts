import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiConsumes,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Group } from './entities/group.entity';
import { Type } from '../type/entities/type.entity';
import {CreateTypeDto} from "../type/dto/create-type.dto";

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
}
