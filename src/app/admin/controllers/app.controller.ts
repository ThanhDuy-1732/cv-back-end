// Utilities
import { Controller, Get } from '@nestjs/common';

// Services
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAdmin(): string {
    return this.appService.getAdmin();
  }
}
