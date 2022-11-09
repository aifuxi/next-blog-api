import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '作者', required: false })
  readonly author?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '口号/座右铭', required: false })
  readonly slogan?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '头像', required: false })
  readonly avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'github', required: false })
  readonly github?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '邮箱', required: false })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '微信号', required: false })
  readonly wechat?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '个人网站链接', required: false })
  readonly site?: string;
}
