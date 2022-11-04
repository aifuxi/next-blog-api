import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePostTagDto } from './create-post-tag.dto';

export class UpdatePostTagDto extends PartialType(CreatePostTagDto) {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ default: true, description: '是否软删除', required: false })
  readonly isDeleted?: boolean;
}
