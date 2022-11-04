import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { PostsModule } from './v1/posts/posts.module';
import { AuthModule } from './v1/auth/auth.module';
import { UsersModule } from './v1/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './v1/auth/guard/jwt-auth.guard';

@Module({
  imports: [DbModule, PostsModule, AuthModule, UsersModule],
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
