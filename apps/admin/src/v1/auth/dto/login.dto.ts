import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
