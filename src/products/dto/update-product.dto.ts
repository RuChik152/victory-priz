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
}
