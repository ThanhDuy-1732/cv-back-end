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
import { SkillService } from '../service/skill.service';

// DTOs
import {
  CreateSkillDTO,
  GetAllSkillDTO,
  UpdateSkillDTO,
  createSkillSchema,
  getAllSkillSchema,
  updateSkillSchema,
} from '../dto/skill.dto';

@ApiBearerAuth()
@ApiTags('Skill')
@Controller('/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'Get all skill' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllSkill(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAllSkillSchema)) data: GetAllSkillDTO,
  ) {
    const { skills, total } = await this.skillService.getAllSkill(data);
    return res.status(HttpStatus.OK).json({
      skills,
      pagination: {
        total,
        limit: data.limit,
        offset: data.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Add skill' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveSkill(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createSkillSchema)) data: CreateSkillDTO,
  ) {
    const skill = await this.skillService.saveSkill(data);
    return res.status(HttpStatus.OK).json({
      skill,
    });
  }

  @ApiOperation({ summary: 'Update skill' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateSkill(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateSkillSchema)) data: UpdateSkillDTO,
  ) {
    const skill = await this.skillService.updateSkill(id, data);
    return res.status(HttpStatus.OK).json({
      skill,
    });
  }

  @ApiOperation({ summary: 'Delete skill' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteSkill(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.skillService.deleteSkill(id);
    return res.status(HttpStatus.OK).json({});
  }
}
