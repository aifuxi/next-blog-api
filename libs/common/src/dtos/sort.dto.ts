import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Prisma } from '@prisma/client';

export enum SortByEnum {
  createdTime = 'createdTime',
  updatedTime = 'updatedTime',
}

export enum PostSortByEnum {
  createdTime = 'createdTime',
  updatedTime = 'updatedTime',
  publishedTime = 'publishedTime',
}

export class SortDto {
  @IsOptional()
  @IsEnum(SortByEnum)
  @ApiProperty({
    description: '按什么类型排序; 默认createdTime',
    default: SortByEnum.createdTime,
    required: false,
    enum: SortByEnum,
  })
  readonly sortBy?: SortByEnum;

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
  @IsEnum(PostSortByEnum)
  @ApiProperty({
    description: '按什么类型排序; 默认createdTime',
    default: SortByEnum.createdTime,
    type: PostSortByEnum,
    required: false,
    enum: PostSortByEnum,
  })
  readonly sortBy?: PostSortByEnum;

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
