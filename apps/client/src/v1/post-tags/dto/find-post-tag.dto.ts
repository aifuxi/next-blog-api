import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { SortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';

export class FindPostTagDto extends SortPaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章标签id',
    required: false,
  })
  readonly id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '文章标签',
    required: false,
  })
  readonly name?: string;
}
