import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { SortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';

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
  @IsBoolean()
  @ApiProperty({
    description: '是否软删除',
    required: false,
  })
  readonly isDeleted?: boolean;
}
