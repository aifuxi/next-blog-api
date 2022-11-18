import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import {
  IS_DELETED_ENUM,
  IS_PUBLISHED_ENUM,
} from '@libs/common/constants/enum';

@Injectable()
export class StatisticsService {
  constructor(private readonly dbService: DbService) {}

  async getCount() {
    const postCount = await this.dbService.post.count({
      where: {
        isDeleted: IS_DELETED_ENUM.NO,
        isPublished: IS_PUBLISHED_ENUM.YES,
      },
    });
    const postCategoryCount = await this.dbService.postCategory.count({
      where: {
        isDeleted: IS_DELETED_ENUM.NO,
      },
    });
    const postTagCount = await this.dbService.postTag.count({
      where: {
        isDeleted: IS_DELETED_ENUM.NO,
      },
    });

    return { postCount, postCategoryCount, postTagCount };
  }
}
