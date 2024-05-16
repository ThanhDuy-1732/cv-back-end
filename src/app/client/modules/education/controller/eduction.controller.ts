// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { EducationService } from '../service/education.service';

@Controller('/educations')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  async getAllEducation(@Res() res: Response) {
    const educations = await this.educationService.findAll();

    return res.status(HttpStatus.OK).json({
      educations,
    });
  }
}
