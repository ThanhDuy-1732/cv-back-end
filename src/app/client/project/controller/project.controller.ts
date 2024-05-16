// Utilities
import { Response } from 'express';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

// Services
import { ProjectService } from '../service/project.service';

@Controller('/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProject(@Res() res: Response) {
    const projects = await this.projectService.findAll();

    return res.status(HttpStatus.OK).json({
      projects,
    });
  }

  @Get('/:id')
  async getProjectById(@Res() res: Response, @Param('id') id: string) {
    const project = await this.projectService.find(id);

    return res.status(HttpStatus.OK).json({
      project,
    });
  }
}
