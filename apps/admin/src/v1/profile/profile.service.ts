import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly dbService: DbService) {}

  create(createProfileDto: CreateProfileDto) {
    return this.dbService.profile.create({
      data: createProfileDto,
    });
  }

  getOne() {
    return this.dbService.profile.findFirst({
      orderBy: {
        createdAt: Prisma.SortOrder.asc,
      },
    });
  }

  findOne(id: string) {
    return this.dbService.profile.findUnique({ where: { id } });
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.dbService.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }
}
