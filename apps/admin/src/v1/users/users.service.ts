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
import { getHashPassword } from '@libs/common/utils';

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
      id,
      email,
      offset = DEFAULT_OFFSET,
      limit = DEFAULT_LIMIT,
      sortBy = SortByEnum.createdTime,
      order = Prisma.SortOrder.desc,
    } = findUserDto;
    let createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === SortByEnum.createdTime) {
      createdAt = order;
    }
    if (sortBy === SortByEnum.updatedTime) {
      updatedAt = order;
    }
    const total = await this.dbService.user.count({
      where: {
        email: {
          contains: email,
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
    const users = await this.dbService.user.findMany({
      where: {
        email: {
          contains: email,
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

    return { total: total || 0, users };
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
    return this.dbService.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
