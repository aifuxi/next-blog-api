import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SortByEnum } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { FindPostCategoryDto } from './dto/find-post-category.dto';
import { DbService } from '@libs/db';

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
      id,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = SortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findPostCategoryDto;
    let createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === SortByEnum.createdTime) {
      createdAt = order;
    }
    if (sortBy === SortByEnum.updatedTime) {
      updatedAt = order;
    }

    const total = await this.dbService.postTag.count({
      where: {
        name: {
          contains: name,
        },
        id,
      },
      orderBy: {
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    });
    const lists = await this.dbService.postTag.findMany({
      where: {
        name: {
          contains: name,
        },
        id,
      },
      orderBy: {
        createdAt,
        updatedAt,
      },
      skip: offset,
      take: limit,
    });

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.postTag.findUnique({ where: { id } });
  }

  update(id: string, updatePostCategoryDto: UpdatePostCategoryDto) {
    return this.dbService.postTag.update({
      where: { id },
      data: updatePostCategoryDto,
    });
  }

  remove(id: string) {
    return this.dbService.postTag.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
