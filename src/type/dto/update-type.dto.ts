import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTypeDto } from './create-type.dto';
import { IsString } from 'class-validator';

export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @ApiProperty({
    description: 'ID type',
    example: '170be600-16d8-4d78-a6ad-59cc761f0e75',
    type: 'string',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name type product',
    required: true,
    example: 'Название_Типа_продукта',
  })
  @IsString()
  type_name: string;
}
