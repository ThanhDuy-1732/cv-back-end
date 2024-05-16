// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { AwardsService } from '../service/award.service';

@Controller('/awards')
export class AwardController {
  constructor(private readonly awardService: AwardsService) {}

  @Get()
  async getAllAwards(@Res() res: Response) {
    const awards = await this.awardService.findAll();

    return res.status(HttpStatus.OK).json({
      awards,
    });
  }
}
