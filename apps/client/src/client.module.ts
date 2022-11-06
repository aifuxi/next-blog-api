import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DbModule } from '@libs/db';
import { PostsModule } from './v1/posts/posts.module';
import { PostCategoriesModule } from './v1/post-categories/post-categories.module';
import { PostTagsModule } from './v1/post-tags/post-tags.module';

@Module({
  imports: [DbModule, PostsModule, PostTagsModule, PostCategoriesModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
