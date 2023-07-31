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
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async createType(@Body() data: { group_id: string; type_name: string }) {
    try {
      return await this.typeService.createType(data.group_id, data.type_name);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async getTypes() {
    try {
      return await this.typeService.findTypes();
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  async getType(@Param('id') id: string) {
    try {
      return await this.typeService.findType(id);
    } catch (err) {
      throw err;
    }
  }
}
