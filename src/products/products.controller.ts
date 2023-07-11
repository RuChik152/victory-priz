import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post, Put,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(@Body() data: CreateProductDto, @UploadedFile() file) {
    console.log('CONTROLLER DATA', data);
    console.log('CONTROLLER PRODUCT', file);
    return await this.productsService.create(data, file);
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
  async updateProduct(@Body() data: CreateProductDto, @UploadedFile() file, @Param('art') art: string) {
    return await this.productsService.update(data, file, art);
  }


  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
