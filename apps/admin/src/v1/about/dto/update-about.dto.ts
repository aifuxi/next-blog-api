import { PickType } from '@nestjs/swagger';
import { CreateAboutDto } from './create-about.dto';

export class UpdateAboutDto extends PickType(CreateAboutDto, ['content']) {}
