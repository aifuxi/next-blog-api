import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';
import { IS_DELETED_ENUM } from '@libs/common/constants/enum';

export class FindUserDto extends SortPaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '用户id',
    required: false,
  })
  readonly id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '用户邮箱',
    required: false,
  })
  readonly email?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: '是否软删除',
    required: false,
    enum: [IS_DELETED_ENUM.NO, IS_DELETED_ENUM.YES],
  })
  readonly isDeleted?: number;
}
