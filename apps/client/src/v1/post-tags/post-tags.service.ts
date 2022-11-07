import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SortByEnum } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { DbService } from '@libs/db';
import { FindPostTagDto } from './dto/find-post-tag.dto';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostTagsService {
  constructor(private readonly dbService: DbService) {}

  async findMany(findPostTagDto: FindPostTagDto) {
    const {
      name,
      id: paramId,
      isDeleted,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = SortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findPostTagDto;
    const id = trimStringData(paramId);
    let createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === SortByEnum.createdTime) {
      createdAt = order;
    }
    if (sortBy === SortByEnum.updatedTime) {
      updatedAt = order;
    }
    const req: Pick<
      Prisma.PostTagFindManyArgs,
      'where' | 'orderBy' | 'skip' | 'take'
    > = {
      where: {
        name: {
          contains: name,
        },
        id,
        isDeleted,
      },
      orderBy: {
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    };
    const total = await this.dbService.postTag.count(req);
    const lists = await this.dbService.postTag.findMany({
      ...req,
      include: {
        posts: {
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
        },
      },
    });

    const data = lists.map((v) => {
      // posts字段对应返回文章数量而不是文章实体数组
      return { ...v, posts: v.posts.length || 0 };
    });

    return { total: total || 0, lists: data };
  }

  findOne(id: string) {
    return this.dbService.postTag.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }
}
