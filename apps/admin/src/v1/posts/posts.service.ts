import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DbService } from '@libs/db';
import { FindPostDto } from './dto/find-post.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { PostSortByEnum, PostSortDto } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '@libs/common/dtos/pagination.dto';

@Injectable()
export class PostsService {
  constructor(private readonly dbService: DbService) {}
  create(createPostDto: CreatePostDto) {
    return this.dbService.post.create({
      data: {
        ...createPostDto,
      },
    });
  }

  // TODO: 查询接口
  async findMany(findPostDto: FindPostDto & PostSortDto & PaginationDto) {
    const {
      title,
      id,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      isPublished,
      sortBy = PostSortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findPostDto;
    let publishedAt: Prisma.SortOrder | undefined,
      createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === PostSortByEnum.createdTime) {
      createdAt = order;
    }
    if (sortBy === PostSortByEnum.updatedTime) {
      updatedAt = order;
    }
    if (sortBy === PostSortByEnum.publishedTime) {
      publishedAt = order;
    }
    const total = await this.dbService.post.count({
      where: {
        title: {
          contains: title,
        },
        id,
        isPublished,
      },
      orderBy: {
        publishedAt,
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    });
    const posts = await this.dbService.post.findMany({
      where: {
        title: {
          contains: title,
        },
        id,
        isPublished,
      },
      orderBy: {
        publishedAt,
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    });

    return { total: total || 0, posts };
  }

  findOne(id: string) {
    return this.dbService.post.findUnique({ where: { id } });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.dbService.post.update({ where: { id }, data: updatePostDto });
  }

  remove(id: string) {
    return this.dbService.post.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
