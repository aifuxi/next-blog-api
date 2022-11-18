import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SORT_BY_ENUM } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { FindPostCategoryDto } from './dto/find-post-category.dto';
import { DbService } from '@libs/db';
import { trimStringData } from '@libs/common/utils';
import { IS_DELETED_ENUM } from '@libs/common/constants/enum';

@Injectable()
export class PostCategoriesService {
  constructor(private readonly dbService: DbService) {}

  async findMany(findPostCategoryDto: FindPostCategoryDto) {
    const {
      name,
      id: paramId,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = SORT_BY_ENUM.CREATED_TIME,
      order = Prisma.SortOrder.desc,
    } = findPostCategoryDto;
    const id = trimStringData(paramId);
    let createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === SORT_BY_ENUM.CREATED_TIME) {
      createdAt = order;
    }
    if (sortBy === SORT_BY_ENUM.UPDATED_TIME) {
      updatedAt = order;
    }

    const req: Pick<Prisma.PostCategoryFindManyArgs, 'where' | 'orderBy'> = {
      where: {
        name: {
          contains: name,
        },
        id,
        isDeleted: IS_DELETED_ENUM.NO,
      },
      orderBy: {
        createdAt,
        updatedAt,
      },
    };
    const total = await this.dbService.postCategory.count(req);
    const lists = await this.dbService.postCategory.findMany({
      ...req,
      skip: offset,
      take: limit,
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
    return this.dbService.postCategory.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }
}
