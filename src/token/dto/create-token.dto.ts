import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({
    description: 'email user',
    required: true,
  })
  @IsString()
  accessToken: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  usergroup: any;

  @IsOptional()
  @IsNumber()
  id: number;
}
