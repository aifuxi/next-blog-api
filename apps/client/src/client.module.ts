import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { DbModule } from '@libs/db';
import { PostsModule } from './v1/posts/posts.module';
import { PostCategoriesModule } from './v1/post-categories/post-categories.module';
import { PostTagsModule } from './v1/post-tags/post-tags.module';
import { StatisticsController } from './v1/statistics/statistics.controller';
import { StatisticsService } from './v1/statistics/statistics.service';
import { StatisticsModule } from './v1/statistics/statistics.module';

@Module({
  imports: [DbModule, PostsModule, PostTagsModule, PostCategoriesModule, StatisticsModule],
  controllers: [ClientController, StatisticsController],
  providers: [ClientService, StatisticsService],
})
export class ClientModule {}
