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
} from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
  getSchemaPath,
  PartialType,
} from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { Type } from './entities/type.entity';
import { CreateGroupDto } from '../group/dto/create-group.dto';

@ApiTags('Type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Info to new Type product',
    schema: {
      type: 'object',
      properties: {
        type_name: { type: 'string', description: 'Name new Type product' },
        group: {
          type: 'object',
          description: 'Group to type product',
          properties: {
            id: { type: 'string', description: 'Id for Group' },
            group_name: { type: 'string', description: 'Name for Group' },
          },
        },
        id: { type: 'string', description: 'Id type product' },
      },
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Description Error',
          example:
            'Could not find any entity of type \\"Group\\" matching: {\\n    \\"id\\": \\"76d0e059-f6d2-4686-b61b-987f6b313472\\"\\n}',
        },
      },
    },
  })
  async createType(@Body() data: CreateTypeDto, @Res() res: Response) {
    try {
      const type = await this.typeService.createType(
        data.group_id,
        data.type_name,
      );
      res.status(type.status).send(type.data);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List type product',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type_name: { type: 'string', description: 'Name new Type product' },
          group: {
            type: 'object',
            description: 'Group to type product',
            properties: {
              id: { type: 'string', description: 'Id for Group' },
              group_name: { type: 'string', description: 'Name for Group' },
            },
          },
          id: { type: 'string', description: 'Id type product' },
        },
      },
    },
  })
  async getTypes() {
    try {
      return await this.typeService.findTypes();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Info to new Type product',
    schema: {
      type: 'object',
      properties: {
        type_name: { type: 'string', description: 'Name new Type product' },
        group: {
          type: 'object',
          description: 'Group to type product',
          properties: {
            id: { type: 'string', description: 'Id for Group' },
            group_name: { type: 'string', description: 'Name for Group' },
          },
        },
        id: { type: 'string', description: 'Id type product' },
      },
    },
  })
  async getType(@Param('id') id: string, @Res() res: Response) {
    try {
      const type = await this.typeService.findType(id);
      res.status(type.status).send(type.data);
    } catch (err) {
      throw err;
    }
  }
  @Delete(':id')
  @ApiResponse({
    schema: {
      type: 'object',
      description: 'Info about  count number deleted "type" object',
      properties: {
        raw: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
        affected: {
          type: 'number',
          description: 'The count deleted object type',
          example: 1,
        },
      },
    },
  })
  async deleteTypeProduct(@Param('id') id: string) {
    return await this.typeService.delete(id);
  }
}
