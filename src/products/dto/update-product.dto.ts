import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'ID product in database',
    required: false,
  })
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  @ApiProperty({ description: 'Sales for sales', required: false })
  sales: string;

  @IsNumber()
  @ApiProperty({
    description: 'Percent for sales',
    required: false,
  })
  sales_percent: number;
}
