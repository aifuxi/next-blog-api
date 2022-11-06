import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PostSortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';

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
  @IsBoolean()
  @ApiProperty({
    description: '文章是否发布',
    required: false,
  })
  readonly isPublished?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: '文章是否软删除',
    required: false,
  })
  readonly isDeleted?: boolean;
}
