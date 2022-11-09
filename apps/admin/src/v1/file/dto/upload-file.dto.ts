import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'file对象',
  })
  readonly file: any;
}
