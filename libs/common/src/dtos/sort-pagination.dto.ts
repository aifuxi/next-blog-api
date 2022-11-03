import { IntersectionType } from '@nestjs/swagger';
import { PostSortDto } from './sort.dto';
import { PaginationDto } from './pagination.dto';

// IntersectionType 可以把两个类型组合成一个类型，这样类型变相的实现了双重继承
// IntersectionType这个函数应该从@nestjs/swagger这个包里导出，以便swagger能够正确推断出类型
export class PostSortPaginationDto extends IntersectionType(
  PostSortDto,
  PaginationDto,
) {}
