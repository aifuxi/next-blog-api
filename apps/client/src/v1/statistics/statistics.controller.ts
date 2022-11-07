import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@Controller('/v1/statistics')
@ApiTags('统计')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('count')
  @ApiOperation({
    summary: '获取未删除的文章(已发布)、文章分类、文章标签的计数',
  })
  getCount() {
    return this.statisticsService.getCount();
  }
}
