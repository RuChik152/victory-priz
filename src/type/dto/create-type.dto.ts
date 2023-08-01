import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDto {
  @ApiProperty({
    description: 'Name type product',
    required: true,
    example: 'Название_Типа_продукта',
  })
  @IsString()
  type_name: string;

  @ApiProperty({
    description: 'ID group',
    required: true,
    example: '08a7a51f-1d57-4f66-bdf0-c3690db97d00',
  })
  @IsString()
  group_id: string;
}
