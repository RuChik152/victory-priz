import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'ID product in database',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name product',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Presentation name product',
    required: false,
  })
  @IsOptional()
  @IsString()
  presentation_name: string;

  @ApiProperty({
    description: 'The article number of this product',
    required: false,
  })
  @IsOptional()
  @IsString()
  art: string;

  @ApiProperty({
    description: 'The cost of this product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Description product',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The link for the image',
    required: false,
  })
  @IsOptional()
  @IsString()
  image: string;
}
