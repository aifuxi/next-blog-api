import { Injectable } from '@nestjs/common';
import { DbService } from '@libs/db';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(private readonly dbService: DbService) {}

  create(createAboutDto: CreateAboutDto) {
    return this.dbService.about.create({
      data: createAboutDto,
    });
  }

  getOne() {
    return this.dbService.about.findFirst();
  }

  findOne(id: string) {
    return this.dbService.about.findUnique({ where: { id } });
  }

  update(id: string, updateAboutDto: UpdateAboutDto) {
    return this.dbService.about.update({ where: { id }, data: updateAboutDto });
  }
}
