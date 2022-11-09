import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/v1/profile')
@ApiTags('profile')
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Post()
  @ApiOperation({ summary: '创建profile' })
  create(@Body() createAboutDto: CreateProfileDto) {
    return this.profileService.create(createAboutDto);
  }

  @Get('')
  @ApiOperation({ summary: '获取第一个profile' })
  getOne() {
    return this.profileService.getOne();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据id查询profile' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新profile' })
  update(@Body() updateAboutDto: UpdateProfileDto, @Param('id') id: string) {
    console.log(updateAboutDto, id);
    return this.profileService.update(id, updateAboutDto);
  }
}
