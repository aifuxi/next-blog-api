import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { UPLOAD_FOLDER } from '@libs/common/constants/upload';

@Module({
  /*imports:
    process.env.NODE_ENV !== 'production'
      ? [
          MulterModule.register({
            storage: diskStorage({
              // 配置文件上传后的文件夹路径
              destination: UPLOAD_FOLDER,
              filename: (req, file, cb) => {
                // 在此处自定义保存后的文件名称
                const filename = `${nanoid()}.${file.mimetype.split('/')[1]}`;
                return cb(null, filename);
              },
            }),
          }),
        ]
      : [],*/
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
