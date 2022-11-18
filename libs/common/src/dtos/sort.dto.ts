import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export enum SORT_BY_ENUM {
  CREATED_TIME = 'CREATED_TIME',
  UPDATED_TIME = 'UPDATED_TIME',
}

export enum POST_SORT_BY_ENUM {
  CREATED_TIME = 'CREATED_TIME',
  UPDATED_TIME = 'UPDATED_TIME',
  PUBLISHED_TIME = 'PUBLISHED_TIME',
}

export class SortDto {
  @IsOptional()
  @IsEnum(SORT_BY_ENUM)
  @ApiProperty({
    description: '按什么类型排序; 默认createdTime',
    default: SORT_BY_ENUM.CREATED_TIME,
    required: false,
    enum: SORT_BY_ENUM,
  })
  readonly sortBy?: SORT_BY_ENUM;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  @ApiProperty({
    description: '正序倒序; 默认desc',
    default: Prisma.SortOrder.desc,
    required: false,
    enum: Prisma.SortOrder,
  })
  readonly order?: Prisma.SortOrder;
}

export class PostSortDto {
  @IsOptional()
  @IsEnum(POST_SORT_BY_ENUM)
  @ApiProperty({
    description: '按什么类型排序; 默认createdTime',
    default: SORT_BY_ENUM.CREATED_TIME,
    type: POST_SORT_BY_ENUM,
    required: false,
    enum: POST_SORT_BY_ENUM,
  })
  readonly sortBy?: POST_SORT_BY_ENUM;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  @ApiProperty({
    description: '正序倒序; 默认desc',
    default: Prisma.SortOrder.desc,
    required: false,
    enum: Prisma.SortOrder,
  })
  readonly order?: Prisma.SortOrder;
}
