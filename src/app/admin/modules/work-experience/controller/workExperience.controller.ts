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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { WorkExperienceService } from '../service/workExperience.service';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateWorkExperienceDTO,
  createWorkExperienceSchema,
  getAllWorkExperienceSchema,
  GetAllWorkWExperienceDTO,
  UpdateWorkExperienceDTO,
  updateWorkExperienceSchema,
} from '../dto/workExperience.dto';
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';

@ApiBearerAuth()
@ApiTags('workExperience')
@Controller('/work-experience')
export class workExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @ApiOperation({ summary: 'Get all work experience' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllWorkExperience(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAllWorkExperienceSchema))
    data: GetAllWorkWExperienceDTO,
  ) {
    const { workExperience, total } =
      await this.workExperienceService.getAllWorkExperiences(data);
    return res.status(HttpStatus.OK).json({
      workExperience,
      pagination: {
        total,
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Get work experience' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getWorkExperience(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const workExperience =
      await this.workExperienceService.getWorkExperience(id);
    return res.status(HttpStatus.OK).json({
      workExperience,
    });
  }

  @ApiOperation({ summary: 'Add work experience' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveWorkExperience(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createWorkExperienceSchema))
    data: CreateWorkExperienceDTO,
  ) {
    const workExperience =
      await this.workExperienceService.saveWorkExperience(data);
    return res.status(HttpStatus.OK).json({
      workExperience,
    });
  }

  @ApiOperation({ summary: 'Update work experience' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateWorkExperience(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWorkExperienceSchema))
    data: UpdateWorkExperienceDTO,
  ) {
    const workExperience =
      await this.workExperienceService.updateWorkExperience(id, data);
    return res.status(HttpStatus.OK).json({
      workExperience,
    });
  }

  @ApiOperation({ summary: 'Delete work experience' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteWorkExperience(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.workExperienceService.deleteWorkExperience(id);
    return res.status(HttpStatus.OK).json({});
  }
}
