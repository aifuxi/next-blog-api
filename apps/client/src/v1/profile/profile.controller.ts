import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/v1/profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get('')
  @ApiOperation({ summary: '获取第一个profile' })
  getOne() {
    return this.profileService.getOne();
  }
}
