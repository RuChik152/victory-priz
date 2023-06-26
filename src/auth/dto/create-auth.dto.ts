import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'email user',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password user',
    minLength: 10,
    required: true,
  })
  @IsString()
  pass: string;

  @ApiProperty({
    description: 'Name User',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User age',
    type: 'number',
    required: false,
  })
  @IsString()
  @IsOptional()
  age?: number;
}
