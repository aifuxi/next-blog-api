import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const logger = new Logger();

  await app.listen(8000);

  logger.log('server is running at http://localhost:8000');
}
bootstrap();
