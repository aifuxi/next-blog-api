import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: '用户邮箱',
    default: '123@qq.com',
    required: true,
  })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: '用户密码', default: '123456', required: true })
  readonly password: string;

  @IsString()
  @ApiProperty({
    description: '用户头像',
    default:
      'https://remix-next-blog-1306920856.cos.ap-shanghai.myqcloud.com/avatar.jpg',
    required: true,
  })
  readonly avatar: string;
}
