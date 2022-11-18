import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';

@Injectable()
export class AboutService {
  constructor(private readonly dbService: DbService) {}

  getOne() {
    return this.dbService.about.findFirst();
  }
}
