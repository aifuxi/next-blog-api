import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';

@Injectable()
export class StatisticsService {
  constructor(private readonly dbService: DbService) {}

  async getCount() {
    const postCount = await this.dbService.post.count({
      where: {
        isDeleted: false,
        isPublished: true,
      },
    });
    const postCategoryCount = await this.dbService.postCategory.count({
      where: {
        isDeleted: false,
      },
    });
    const postTagCount = await this.dbService.postTag.count({
      where: {
        isDeleted: false,
      },
    });

    return { postCount, postCategoryCount, postTagCount };
  }
}
