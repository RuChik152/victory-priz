import { IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {

  @IsString()
  email: string;

  @IsString()
  pass: string;

  @IsString()
  @IsOptional()
  name?: string;
}
