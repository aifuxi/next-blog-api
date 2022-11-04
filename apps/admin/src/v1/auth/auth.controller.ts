import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from '@libs/common/meta-datas/public.meta';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('/v1/auth')
@ApiTags('验证')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: LoginDto, @Req() req) {
    // 经local-strategy验证成功过后，会在request对象上挂载一个user属性
    return this.authService.login(req.user);
  }
}
