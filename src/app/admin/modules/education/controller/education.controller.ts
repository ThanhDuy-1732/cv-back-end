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
import { EducationService } from '../service/education.service';

// DTOs
import {
  GetEducationDTO,
  CreateEducationDTO,
  getEducationSchema,
  UpdateEducationDTO,
  createEducationSchema,
  updateEducationSchema,
} from '../dto/education.dto';

@ApiBearerAuth()
@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ summary: 'Get all education' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllEducation(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getEducationSchema))
    query: GetEducationDTO,
  ) {
    const [educations, total] = await this.educationService.getEducation(query);
    return res.status(HttpStatus.OK).json({
      educations,
      pagination: {
        total,
        limit: query?.limit,
        offset: query?.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Save education' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveEducation(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createEducationSchema))
    payload: CreateEducationDTO,
  ) {
    const education = await this.educationService.saveEducation(payload);
    return res.status(HttpStatus.OK).json({
      education,
    });
  }

  @ApiOperation({ summary: 'Update education' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateEducation(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateEducationSchema))
    payload: UpdateEducationDTO,
  ) {
    const education = await this.educationService.updateEducation(id, payload);
    return res.status(HttpStatus.OK).json({
      education,
    });
  }

  @ApiOperation({ summary: 'Delete education' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async declareEducation(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.educationService.deleteEducation(id);
    return res.status(HttpStatus.OK).json({});
  }
}
