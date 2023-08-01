import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Name Group',
    required: true,
    example: 'Названия_группы_1',
  })
  @IsString()
  group_name: string;

  @ApiProperty({
    required: false,
    description: 'ID Group',
    example: 'c8f339c1-bce6-42a3-bad5-2de9414180e2',
  })
  @IsOptional()
  id: string;
}
