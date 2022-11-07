import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/v1/about')
@ApiTags('关于')
@ApiBearerAuth()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
  @Post()
  @ApiOperation({ summary: '创建关于' })
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.create(createAboutDto);
  }

  @Get('')
  @ApiOperation({ summary: '获取第一个about' })
  getOne() {
    return this.aboutService.getOne();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查询关于' })
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新关于' })
  update(@Body() updateAboutDto: UpdateAboutDto, @Param('id') id: string) {
    console.log(updateAboutDto, id);
    return this.aboutService.update(id, updateAboutDto);
  }
}
