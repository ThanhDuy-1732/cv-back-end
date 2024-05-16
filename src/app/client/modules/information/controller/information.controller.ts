// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { InformationService } from '../service/information.service';

@Controller('/information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @Get()
  async getAllInformation(@Res() res: Response) {
    const information = await this.informationService.findAll();

    return res.status(HttpStatus.OK).json({
      information,
    });
  }
}
