import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePostCategoryDto } from './create-post-category.dto';

export class UpdatePostCategoryDto extends PartialType(CreatePostCategoryDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: true, description: '是否软删除', required: false })
  readonly isDeleted?: boolean;
}
