import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { FindPostDto } from './dto/find-post.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { POST_SORT_BY_ENUM } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { trimStringData } from '@libs/common/utils';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
} from '@libs/common/constants/enum';

@Injectable()
export class PostsService {
  constructor(private readonly dbService: DbService) {}

  async findMany(findPostDto: FindPostDto) {
    const {
      title,
      id: paramId,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = POST_SORT_BY_ENUM.CREATED_TIME,
      order = Prisma.SortOrder.desc,
    } = findPostDto;
    const id = trimStringData(paramId);
    let publishedAt: Prisma.SortOrder | undefined,
      createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === POST_SORT_BY_ENUM.CREATED_TIME) {
      createdAt = order;
    }
    if (sortBy === POST_SORT_BY_ENUM.UPDATED_TIME) {
      updatedAt = order;
    }
    if (sortBy === POST_SORT_BY_ENUM.PUBLISHED_TIME) {
      publishedAt = order;
    }
    const req: Pick<Prisma.PostFindManyArgs, 'where' | 'orderBy'> = {
      where: {
        title: {
          contains: title,
        },
        id,
        isPublished: IS_PUBLISHED_ENUM.YES,
        isDeleted: IS_DELETED_ENUM.NO,
      },
      orderBy: {
        publishedAt,
        createdAt,
        updatedAt,
      },
    };
    const total = await this.dbService.post.count(req);
    const lists = await this.dbService.post.findMany({
      ...req,
      skip: offset,
      take: limit,
      // 只选择返回部分字段，content字段不返回，content字段是代表文章内容，里面包含的数据可能比较多，
      // 这里不返回，能减少response的大小
      select: {
        id: true,
        title: true,
        categories: true,
        tags: true,
        createdAt: true,
        description: true,
        view: true,
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

  async viewIncrement(id: string) {
    const post = await this.dbService.post.findFirst({ where: { id } });
    return this.dbService.post.update({
      where: { id },
      data: {
        view: post.view + 1,
      },
    });
  }
}
