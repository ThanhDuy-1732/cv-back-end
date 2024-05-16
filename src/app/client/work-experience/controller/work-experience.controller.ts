// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { WorkExperienceService } from '../service/work-experience.service';

@Controller('/work-experiences')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @Get()
  async getAllWorkExperience(@Res() res: Response) {
    const workExperiences = await this.workExperienceService.findAll();

    return res.status(HttpStatus.OK).json({
      workExperiences,
    });
  }
}
