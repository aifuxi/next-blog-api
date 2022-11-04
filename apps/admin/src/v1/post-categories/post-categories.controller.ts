import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostCategoriesService } from './post-categories.service';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { FindPostCategoryDto } from './dto/find-post-category.dto';

@Controller('post_categories')
@ApiTags('文章分类')
@ApiBearerAuth()
export class PostCategoriesController {
  constructor(private readonly postCategoriesService: PostCategoriesService) {}

  @Post()
  @ApiOperation({ summary: '创建文章分类' })
  create(@Body() createPostCategoryDto: CreatePostCategoryDto) {
    return this.postCategoriesService.create(createPostCategoryDto);
  }

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

  @Patch(':id')
  @ApiOperation({ summary: '更新文章分类' })
  update(
    @Param('id') id: string,
    @Body() updatePostCategoryDto: UpdatePostCategoryDto,
  ) {
    return this.postCategoriesService.update(id, updatePostCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '软删除文章分类' })
  remove(@Param('id') id: string) {
    return this.postCategoriesService.remove(id);
  }
}
