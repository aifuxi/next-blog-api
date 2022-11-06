import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SortByEnum } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { FindPostCategoryDto } from './dto/find-post-category.dto';
import { DbService } from '@libs/db';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostCategoriesService {
  constructor(private readonly dbService: DbService) {}

  async findMany(findPostCategoryDto: FindPostCategoryDto) {
    const {
      name,
      id: paramId,
      isDeleted,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = SortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findPostCategoryDto;
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
      Prisma.PostCategoryFindManyArgs,
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
    const total = await this.dbService.postCategory.count(req);
    const lists = await this.dbService.postCategory.findMany(req);

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.postCategory.findUnique({ where: { id } });
  }
}
