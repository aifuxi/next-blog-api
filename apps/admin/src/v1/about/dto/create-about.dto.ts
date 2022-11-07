import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutDto {
  @IsString()
  @ApiProperty({ description: '关于的内容', required: true })
  readonly content: string;
}
