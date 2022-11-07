import { Controller, Get } from '@nestjs/common';
import { AboutService } from './about.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/v1/about')
@ApiTags('关于')
@ApiBearerAuth()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  @Get('')
  @ApiOperation({ summary: '获取第一个about' })
  getOne() {
    return this.aboutService.getOne();
  }
}
