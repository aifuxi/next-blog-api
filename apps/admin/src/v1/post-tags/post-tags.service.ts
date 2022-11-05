import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { SortByEnum } from '@libs/common/dtos/sort.dto';
import { Prisma } from '@prisma/client';
import { CreatePostTagDto } from './dto/create-post-tag.dto';
import { UpdatePostTagDto } from './dto/update-post-tag.dto';
import { DbService } from '@libs/db';
import { FindPostTagDto } from './dto/find-post-tag.dto';
import { trimStringData } from '@libs/common/utils';

@Injectable()
export class PostTagsService {
  constructor(private readonly dbService: DbService) {}
  create(createPostTagDto: CreatePostTagDto) {
    return this.dbService.postTag.create({
      data: {
        ...createPostTagDto,
      },
    });
  }

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
    const lists = await this.dbService.postTag.findMany(req);

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.postTag.findUnique({ where: { id } });
  }

  update(id: string, updatePostTagDto: UpdatePostTagDto) {
    return this.dbService.postTag.update({
      where: { id },
      data: updatePostTagDto,
    });
  }

  remove(id: string) {
    return this.dbService.postTag.delete({
      where: { id },
    });
  }
}
