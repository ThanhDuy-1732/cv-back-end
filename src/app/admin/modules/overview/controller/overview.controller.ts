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
import { OverviewService } from '../services/overview.service';
import {
  GetOverviewDTO,
  CreateOverviewDTO,
  getOverviewSchema,
  UpdateOverviewDTO,
  createOverviewSchema,
  updateOverviewSchema,
} from '../dto/overview.dto';

@ApiBearerAuth()
@ApiTags('Overview')
@Controller('/overview')
export class OverviewController {
  constructor(private readonly overviewService: OverviewService) {}

  @ApiOperation({ summary: 'Get all overview' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOverview(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getOverviewSchema)) query: GetOverviewDTO,
  ) {
    const { overview, total } =
      await this.overviewService.getAllOverview(query);
    return res.status(HttpStatus.OK).json({
      overview,
      pagination: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Add overview' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveOverview(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createOverviewSchema))
    payload: CreateOverviewDTO,
  ) {
    const overview = await this.overviewService.saveOverview(payload);
    return res.status(HttpStatus.OK).json({
      overview,
    });
  }

  @ApiOperation({ summary: 'Update overview' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateOverview(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateOverviewSchema))
    payload: UpdateOverviewDTO,
  ) {
    const overview = await this.overviewService.updateOverview(id, payload);
    return res.status(HttpStatus.OK).json({
      overview,
    });
  }

  @ApiOperation({ summary: 'Delete overview' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOverview(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.overviewService.deleteOverview(id);
    return res.status(HttpStatus.OK).json({});
  }
}
