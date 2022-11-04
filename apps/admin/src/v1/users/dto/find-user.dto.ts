import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortPaginationDto } from '@libs/common/dtos/sort-pagination.dto';

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
}
