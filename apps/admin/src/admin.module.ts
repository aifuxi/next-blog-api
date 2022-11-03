import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';
import { PostsModule } from './v1/posts/posts.module';

@Module({
  imports: [DbModule, PostsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
