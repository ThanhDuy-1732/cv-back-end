// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { OverviewService } from '../service/overview.service';

@Controller('overviews')
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) {}

  @Get()
  async getAllOverview(@Res() res: Response) {
    const overviews = await this.overviewService.findAll();

    return res.status(HttpStatus.OK).json({
      overviews,
    });
  }
}
