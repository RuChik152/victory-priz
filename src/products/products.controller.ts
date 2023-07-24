import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Express } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as process from 'process';

export type DeleteArrProp = string[];

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'Download file for product',
  })
  @ApiResponse({
    status: 200,
    description: 'Information for new product',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name product' },
        presentation_name: {
          type: 'string',
          description: 'Presentations name product',
        },
        art: { type: 'string', description: 'Item number' },
        price: { type: 'number', description: 'The cost of the goods' },
        description: { type: 'string', description: 'description product' },
        type: {
          type: 'string',
          description: 'Type product',
          example: 'standard',
        },
        group: {
          type: 'string',
          description: 'Group product',
          example: 'cups',
        },
        image_link: {
          type: 'string',
          description: 'Link for image product',
          example: `${process.env.HOST}/products/image/3TAS14E485878EE33111`,
        },
        id: { type: 'number', description: 'ID product' },
        sales: {
          type: 'boolean',
          description: 'State for sales',
        },
        sales_percent: {
          type: 'number',
          description: 'Percent for sales',
        },
      },
    },
  })
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const prod = await this.productsService.create(data, file);
      res.status(prod.status).send(prod.data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  @Get()
  async getProducts() {
    try {
      return await this.productsService.get();
    } catch (err) {
      throw err;
    }
  }

  @Get(':art')
  @ApiResponse({
    status: 200,
    description: 'Information for new product',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name product' },
        presentation_name: {
          type: 'string',
          description: 'Presentations name product',
        },
        art: { type: 'string', description: 'Item number' },
        price: { type: 'number', description: 'The cost of the goods' },
        description: { type: 'string', description: 'description product' },
        type: { type: 'string', description: 'Type product', example: 'cups' },
        group: {
          type: 'string',
          description: 'Group product',
          example: 'gift',
        },
        image_link: {
          type: 'string',
          description: 'Link for image product',
          example: `${process.env.HOST}/products/image/3TAS14E485878EE33111`,
        },
        id: { type: 'number', description: 'ID product' },
      },
    },
  })
  async getProduct(@Param('art') art: string) {
    try {
      return await this.productsService.getProduct(art);
    } catch (err) {
      throw err;
    }
  }

  @Get('image/:art')
  @Header('Content-Type', 'image/png')
  async getImage(@Param('art') art: string) {
    console.log('GET IMAGE CONTROLLER: ', art);
    const file = await this.productsService.getImage(art);
    return new StreamableFile(file);
  }

  @Put(':art')
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Body() data: UpdateProductDto,
    @UploadedFile() file,
    @Param('art') art: string,
  ) {
    console.log('TRANSFORM: ', data);
    return await this.productsService.update(data, file, art);
  }

  @Get('cups/all')
  async getCups() {
    try {
      return await this.productsService.getCups();
    } catch (error) {
      throw error;
    }
  }

  @Get('medals/all')
  async getMedals() {
    try {
      return await this.productsService.getMedals();
    } catch (error) {
      throw error;
    }
  }

  @Delete(':art')
  async deleteProduct(@Param('art') art: string) {
    try {
      return await this.productsService.delete(art);
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteProducts(@Body() data: string[]) {
    try {
      return await this.productsService.deleteArr(data);
    } catch (error) {
      throw error;
    }
  }
}
