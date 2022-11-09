import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@libs/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@libs/common/filters/http-execption.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CLIENT_API, CLIENT_API_DOCS } from '@libs/common/constants/path';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        // 根据ts类型自动转换类型
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('/client_api');

  const logger = new Logger();

  // 全局拦截器，对返回结果统一包装成 {code: xxx, message: 'success', data: xxx }
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局异常过滤器，返回统一处理异常信息和状态码
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('博客后台api')
    .setDescription('使用nestjs prisma postgresql构建')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(9000);

  logger.log(`server is running at ${CLIENT_API}`, 'LOOK AT ME ->->');
  logger.log(
    `swagger api doc is running at ${CLIENT_API_DOCS}`,
    'LOOK AT ME ->->',
  );
}
bootstrap();
