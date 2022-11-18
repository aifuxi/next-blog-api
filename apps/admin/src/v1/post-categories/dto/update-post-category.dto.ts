import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreatePostCategoryDto } from './create-post-category.dto';
import { IS_DELETED_ENUM } from '@libs/common/constants/enum';

export class UpdatePostCategoryDto extends PartialType(CreatePostCategoryDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: IS_DELETED_ENUM.NO,
    description: '是否软删除',
    required: false,
    enum: [IS_DELETED_ENUM.NO, IS_DELETED_ENUM.YES],
  })
  readonly isDeleted?: number;
}
