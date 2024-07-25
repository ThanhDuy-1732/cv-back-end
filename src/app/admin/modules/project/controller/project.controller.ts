// Utilities
import {
  Get,
  Put,
  Res,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { ProjectService } from '../service/project.service';

// DTOs
import {
  CreateProjectDTO,
  GetAllProjectDTO,
  UpdateProjectDTO,
  createProjectSchema,
  getAllProjectSchema,
  updateProjectSchema,
} from '../dto/project.dto';

@ApiBearerAuth()
@ApiTags('Project')
@Controller('/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all project' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProject(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAllProjectSchema)) query: GetAllProjectDTO,
  ) {
    const { projects, total } = await this.projectService.getAllProjects(query);
    return res.status(HttpStatus.OK).json({
      projects,
      pagination: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Get project' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getProject(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const project = await this.projectService.getProject(id);
    return res.status(HttpStatus.OK).json({
      project,
    });
  }

  @ApiOperation({ summary: 'Add project' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveProject(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createProjectSchema)) data: CreateProjectDTO,
  ) {
    const project = await this.projectService.saveProject(data);
    return res.status(HttpStatus.OK).json({
      project,
    });
  }

  @ApiOperation({ summary: 'Update project' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateProjectSchema)) data: UpdateProjectDTO,
  ) {
    const project = await this.projectService.updateProject(id, data);
    return res.status(HttpStatus.OK).json({
      project,
    });
  }

  @ApiOperation({ summary: 'Delete project' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteProject(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.projectService.deleteProject(id);
    return res.status(HttpStatus.OK).json({});
  }
}
