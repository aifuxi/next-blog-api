import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { FindPostDto } from './dto/find-post.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { PostSortByEnum } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostsService {
  constructor(private readonly dbService: DbService) {}

  async findMany(findPostDto: FindPostDto) {
    const {
      title,
      id: paramId,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      isPublished,
      isDeleted,
      sortBy = PostSortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findPostDto;
    console.log('isDeleted, isPublished', isDeleted, isPublished);
    const id = trimStringData(paramId);
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
    const req: Pick<
      Prisma.PostFindManyArgs,
      'where' | 'orderBy' | 'skip' | 'take'
    > = {
      where: {
        title: {
          contains: title,
        },
        id,
        isPublished,
        isDeleted,
      },
      orderBy: {
        publishedAt,
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    };
    const total = await this.dbService.post.count(req);
    const lists = await this.dbService.post.findMany({
      ...req,
      include: {
        categories: true,
        tags: true,
      },
    });

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.post.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });
  }
}
