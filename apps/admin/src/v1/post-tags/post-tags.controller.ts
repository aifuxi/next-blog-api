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
import { CreatePostTagDto } from './dto/create-post-tag.dto';
import { UpdatePostTagDto } from './dto/update-post-tag.dto';
import { FindPostTagDto } from './dto/find-post-tag.dto';
import { PostTagsService } from './post-tags.service';

@Controller('post_tags')
@ApiTags('文章标签')
@ApiBearerAuth()
export class PostTagsController {
  constructor(private readonly postTagsService: PostTagsService) {}

  @Post()
  @ApiOperation({ summary: '创建文章标签' })
  create(@Body() createPostTagDto: CreatePostTagDto) {
    return this.postTagsService.create(createPostTagDto);
  }

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

  @Patch(':id')
  @ApiOperation({ summary: '更新文章标签' })
  update(@Param('id') id: string, @Body() updatePostTagDto: UpdatePostTagDto) {
    return this.postTagsService.update(id, updatePostTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '软删除文章标签' })
  remove(@Param('id') id: string) {
    return this.postTagsService.remove(id);
  }
}
