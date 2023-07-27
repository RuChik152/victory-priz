import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    description: 'The type for product',
    required: true,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The type group for product, medals, cups, etc.',
    required: true,
    example: 'cups',
  })
  @IsString()
  group: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({
    description: 'Sales for sales',
    example: 'no-sales',
    required: false,
    default: 'no-sales',
  })
  @IsString()
  @IsOptional()
  sales: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Percent for sales',
    required: false,
    example: 0,
    default: 0,
  })
  sales_percent: number;
}
