import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DbService } from '@libs/db';
import { FindPostDto } from './dto/find-post.dto';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { POST_SORT_BY_ENUM } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostsService {
  constructor(private readonly dbService: DbService) {}
  create(createPostDto: CreatePostDto) {
    return this.dbService.post.create({
      data: {
        ...createPostDto,
        categories: {
          connect: createPostDto.categories?.map((v) => ({ id: v })),
        },
        tags: {
          connect: createPostDto.tags?.map((v) => ({ id: v })),
        },
      },
    });
  }

  async findMany(findPostDto: FindPostDto) {
    const {
      title,
      id: paramId,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      isPublished,
      isDeleted,
      sortBy = POST_SORT_BY_ENUM.CREATED_TIME,
      order = Prisma.SortOrder.desc,
    } = findPostDto;
    console.log('isDeleted, isPublished', isDeleted, isPublished);
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
        isPublished,
        isDeleted,
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
      include: {
        categories: true,
        tags: true,
      },
    });

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.post.findUnique({ where: { id } });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.dbService.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        categories: {
          connect: updatePostDto.categories?.map((v) => ({ id: v })),
        },
        tags: {
          connect: updatePostDto.tags?.map((v) => ({ id: v })),
        },
      },
    });
  }

  remove(id: string) {
    return this.dbService.post.delete({
      where: { id },
    });
  }
}
