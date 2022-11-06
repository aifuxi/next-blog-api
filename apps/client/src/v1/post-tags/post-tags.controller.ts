import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindPostTagDto } from './dto/find-post-tag.dto';
import { PostTagsService } from './post-tags.service';

@Controller('/v1/post_tags')
@ApiTags('文章标签')
@ApiBearerAuth()
export class PostTagsController {
  constructor(private readonly postTagsService: PostTagsService) {}

  @Get()
  @ApiOperation({ summary: '查询文章标签' })
  findMany(@Query() findPostTagDto: FindPostTagDto) {
    return this.postTagsService.findMany(findPostTagDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查询文章标签' })
  findOne(@Param('id') id: string) {
    return this.postTagsService.findOne(id);
  }
}
