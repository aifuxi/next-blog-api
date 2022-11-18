import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SORT_BY_ENUM } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { FindPostCategoryDto } from './dto/find-post-category.dto';
import { DbService } from '@libs/db';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostCategoriesService {
  constructor(private readonly dbService: DbService) {}
  create(createPostCategoryDto: CreatePostCategoryDto) {
    return this.dbService.postCategory.create({
      data: {
        ...createPostCategoryDto,
      },
    });
  }

  async findMany(findPostCategoryDto: FindPostCategoryDto) {
    const {
      name,
      id: paramId,
      isDeleted,
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
        isDeleted,
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
    });

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.postCategory.findUnique({ where: { id } });
  }

  update(id: string, updatePostCategoryDto: UpdatePostCategoryDto) {
    return this.dbService.postCategory.update({
      where: { id },
      data: updatePostCategoryDto,
    });
  }

  remove(id: string) {
    return this.dbService.postCategory.delete({
      where: { id },
    });
  }
}
