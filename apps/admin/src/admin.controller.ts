import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from '@libs/common/meta-datas/public.meta';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Public()
  getHello() {
    return this.adminService.getHello();
  }
}
