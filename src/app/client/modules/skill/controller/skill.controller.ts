// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

// Services
import { SkillService } from '../service/skill.service';

@Controller('/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getAllSkill(@Res() res: Response) {
    const skills = await this.skillService.findAll();

    return res.status(HttpStatus.OK).json({
      skills,
    });
  }
}
