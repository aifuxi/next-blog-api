import { IntersectionType } from '@nestjs/swagger';
import { PostSortDto } from './sort.dto';
import { PaginationDto } from './pagination.dto';

export class PostSortPaginationDto extends IntersectionType(
  PostSortDto,
  PaginationDto,
) {}
