import { IsOptional, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  @IsOptional()
  refreshToken: string;

  @IsOptional()
  @IsString()
  email: string;
}
