import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsString()
  descriptions: string;

  @IsNumber()
  userId: number;
}
