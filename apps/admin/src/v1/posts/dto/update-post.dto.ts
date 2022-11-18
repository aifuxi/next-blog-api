import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
} from '@libs/common/constants/enum';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: IS_PUBLISHED_ENUM.NO,
    description: '是否发布',
    required: false,
    enum: [IS_PUBLISHED_ENUM.NO, IS_PUBLISHED_ENUM.YES],
  })
  readonly isPublished?: number;

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
