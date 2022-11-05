import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '@libs/db';
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '@libs/common/constants/pagination';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SortByEnum } from '@libs/common/dtos/sort.dto';
import { getHashPassword, trimStringData } from '@libs/common/utils';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}
  create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hash = getHashPassword(password);
    return this.dbService.user.create({
      data: {
        ...createUserDto,
        password: hash,
      },
    });
  }

  async findMany(findUserDto: FindUserDto) {
    const {
      id: paramId,
      email,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      isDeleted,
      sortBy = SortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findUserDto;
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
      Prisma.UserFindManyArgs,
      'where' | 'orderBy' | 'skip' | 'take'
    > = {
      where: {
        email: {
          contains: email,
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
    const total = await this.dbService.user.count(req);
    const lists = await this.dbService.user.findMany(req);

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new NotFoundException(`找不到email为${email}的用户`);
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.dbService.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.dbService.user.delete({
      where: { id },
    });
  }
}
