import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsergroupDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name user group',
  })
  @IsString()
  name: string;
}
