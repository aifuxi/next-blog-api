import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    DbModule,
    PostsModule,
    AuthModule,
    UsersModule,
    PostTagsModule,
    PostCategoriesModule,
    AboutModule,
    ProfileModule,
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
