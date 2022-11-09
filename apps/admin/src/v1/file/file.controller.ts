import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@Controller('/v1/file')
@ApiTags('文件上传')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '文件上传',
    type: UploadFileDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }
}
