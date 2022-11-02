import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';

@Injectable()
export class AdminService {
  constructor(private readonly dbService: DbService) {}
  getHello() {
    return this.dbService.postTag.create({
      data: {
        name: '测试标签',
        description: '测试标签描述，miao',
      },
    });
  }
}
