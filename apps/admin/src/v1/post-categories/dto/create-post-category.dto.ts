import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostCategoryDto {
  @IsString()
  @ApiProperty({
    description: '文章分类',
    required: true,
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '文章分类描述', required: false })
  readonly description?: string;
}
