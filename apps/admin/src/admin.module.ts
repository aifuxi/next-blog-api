import { Module } from '@nestjs/common';
// 这个路径ConfigModule一定要在使用到了process.env的变量的模块之前import
// 如果使用了process.env变量的模块在ConfigModule之前，那么其实模块已经初始化好了
// 由于该模块早于ConfigModule初始化，这个时候还解析到ConfigModule，怎么往process.env里面注入变量呢
import { ConfigModule } from '@libs/config';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { PostsModule } from './v1/posts/posts.module';
import { AuthModule } from './v1/auth/auth.module';
import { UsersModule } from './v1/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './v1/auth/guard/jwt-auth.guard';
import { PostTagsModule } from './v1/post-tags/post-tags.module';
import { PostCategoriesModule } from './v1/post-categories/post-categories.module';
import { AboutModule } from './v1/about/about.module';
import { ProfileModule } from './v1/profile/profile.module';
import { FileModule } from './v1/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UPLOAD_FOLDER } from '@libs/common/constants/upload';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    PostsModule,
    AuthModule,
    UsersModule,
    PostTagsModule,
    PostCategoriesModule,
    AboutModule,
    ProfileModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: UPLOAD_FOLDER,
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AdminModule {}
