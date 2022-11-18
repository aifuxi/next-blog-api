import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PostSortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
  POST_TYPE_ENUM,
} from '@libs/common/constants/enum';

export class FindPostDto extends PostSortPaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章id',
    required: false,
  })
  readonly id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章标题',
    required: false,
  })
  readonly title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章类型',
    required: false,
    enum: [
      POST_TYPE_ENUM.ORIGINAL,
      POST_TYPE_ENUM.TRANSLATION,
      POST_TYPE_ENUM.TRANSLATION,
    ],
  })
  readonly type?: POST_TYPE_ENUM;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    default: IS_PUBLISHED_ENUM.NO,
    description: '文章是否发布',
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
