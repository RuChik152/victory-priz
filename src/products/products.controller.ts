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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFile() file,
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
