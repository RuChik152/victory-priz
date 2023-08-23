import { PartialType } from '@nestjs/mapped-types';
import { CreateUsergroupDto } from './create-usergroup.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUsergroupDto extends PartialType(CreateUsergroupDto) {
  @ApiProperty({
    type: String,
    required: false,
    description: 'ID user group',
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'New name for user group',
  })
  @IsString()
  newName: string;
}
