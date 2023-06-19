import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  pass?: string;

  @IsOptional()
  orders?: any;
}
