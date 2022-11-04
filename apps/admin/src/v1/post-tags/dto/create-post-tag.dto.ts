import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostTagDto {
  @IsString()
  @ApiProperty({
    description: '文章标签',
    required: true,
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '文章标签描述', required: false })
  readonly description?: string;
}
