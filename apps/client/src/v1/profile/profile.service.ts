import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly dbService: DbService) {}

  getOne() {
    return this.dbService.profile.findFirst({
      orderBy: {
        createdAt: Prisma.SortOrder.asc,
      },
    });
  }
}
