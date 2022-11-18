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
import { SORT_BY_ENUM } from '@libs/common/dtos/sort.dto';
import { getHashPassword, trimStringData } from '@libs/common/utils';
import { IS_DELETED_ENUM } from '@libs/common/constants/enum';

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
      sortBy = SORT_BY_ENUM.CREATED_TIME,
      order = Prisma.SortOrder.desc,
    } = findUserDto;
    const id = trimStringData(paramId);
    let createdAt: Prisma.SortOrder | undefined,
      updatedAt: Prisma.SortOrder | undefined;
    if (sortBy === SORT_BY_ENUM.CREATED_TIME) {
      createdAt = order;
    }
    if (sortBy === SORT_BY_ENUM.UPDATED_TIME) {
      updatedAt = order;
    }
    const req: Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy'> = {
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
    };
    const total = await this.dbService.user.count(req);
    const lists = await this.dbService.user.findMany({
      ...req,
      skip: offset,
      take: limit,
    });

    return { total: total || 0, lists };
  }

  findOne(id: string) {
    return this.dbService.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string) {
    const user = await this.dbService.user.findFirst({
      where: {
        email,
        isDeleted: IS_DELETED_ENUM.NO,
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
