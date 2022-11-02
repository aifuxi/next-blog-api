import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbModule } from '@libs/db';

@Module({
  imports: [DbModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
