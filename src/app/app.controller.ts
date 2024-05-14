import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Comment } from 'src/schemas/comment.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/comments')
  async getComments(): Promise<Comment[]> {
    return await this.appService.getComments();
  }
}
