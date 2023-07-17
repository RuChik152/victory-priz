import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name product',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Presentation name product',
    required: true,
  })
  @IsString()
  presentation_name: string;

  @ApiProperty({
    description: 'The article number of this product',
    required: true,
  })
  @IsString()
  art: string;

  @ApiProperty({
    description: 'The cost of this product',
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Description product',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The type for product, cups or medals',
    required: true,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The type group for product',
    required: true,
    example: 'cups',
  })
  @IsString()
  group: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
