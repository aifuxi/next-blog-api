import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';
import { IS_DELETED_ENUM } from '@libs/common/constants/enum';

export class FindPostCategoryDto extends SortPaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章分类id',
    required: false,
  })
  readonly id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章分类',
    required: false,
  })
  readonly name?: string;

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
