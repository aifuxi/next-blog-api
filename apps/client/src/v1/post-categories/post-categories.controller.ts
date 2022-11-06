import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostCategoriesService } from './post-categories.service';
import { FindPostCategoryDto } from './dto/find-post-category.dto';

@Controller('/v1/post_categories')
@ApiTags('文章分类')
@ApiBearerAuth()
export class PostCategoriesController {
  constructor(private readonly postCategoriesService: PostCategoriesService) {}

  @Get()
  @ApiOperation({ summary: '查询文章分类' })
  findMany(@Query() findPostCategoryDto: FindPostCategoryDto) {
    return this.postCategoriesService.findMany(findPostCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查询文章分类' })
  findOne(@Param('id') id: string) {
    return this.postCategoriesService.findOne(id);
  }
}
