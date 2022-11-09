import { Injectable } from '@nestjs/common';
import * as COS from 'cos-nodejs-sdk-v5';
import { nanoid } from 'nanoid';
import { ADMIN_API } from '@libs/common/constants/path';
@Injectable()
export class FileService {
  private cos: COS;
  constructor() {
    this.cos = new COS({
      SecretId: process.env.OSS_SECRET_ID,
      SecretKey: process.env.OSS_SECRET_KEY,
    });
  }
  async uploadFile(file: Express.Multer.File) {
    let url = '';
    if (process.env.NODE_ENV === 'production') {
      const res = await this.cos.putObject({
        Bucket: process.env.OSS_BUCKET,
        Region: process.env.OSS_REGION,
        Key: nanoid(4) + file.originalname /* 必须, 可以看成是上传后的文件名 */,
        Body: file.buffer, // 上传文件对象
      });
      url = res.Location;
    } else {
      url = `${ADMIN_API}/${file.filename}`;
    }
    return { url };
  }
}
