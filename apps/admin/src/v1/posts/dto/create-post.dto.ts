import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @ApiProperty({
    description: '文章标题',
    required: true,
  })
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '文章描述', required: false })
  readonly description?: string;

  @IsString()
  @ApiProperty({ description: '文章内容', required: true })
  readonly content: string;

  @IsString({ each: true }) // 规定类型为string数组
  @IsOptional()
  @ApiProperty({
    description: '文章分类ids',
    required: false,
    type: String,
    isArray: true,
  })
  readonly categories?: string[];

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({
    description: '文章标签ids',
    type: String,
    isArray: true,
    required: false,
  })
  readonly tags?: string[];
}
