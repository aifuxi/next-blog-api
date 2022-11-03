import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: true, description: '是否发布', required: false })
  readonly isPublished?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: true, description: '是否软删除', required: false })
  readonly isDeleted?: boolean;
}
