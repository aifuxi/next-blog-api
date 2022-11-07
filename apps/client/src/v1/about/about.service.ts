import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { CreateAboutDto } from '../../../../admin/src/v1/about/dto/create-about.dto';

@Injectable()
export class AboutService {
  constructor(private readonly dbService: DbService) {}

  getOne() {
    return this.dbService.about.findFirst();
  }
}
