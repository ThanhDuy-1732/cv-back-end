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
import { AwardService } from '../service/award.service';

// DTOs
import {
  GetAwardsDTO,
  CreateAwardDTO,
  UpdateAwardDTO,
  getAwardsSchema,
  createAwardSchema,
  updateAwardSchema,
} from '../dto/award.dto';

@ApiBearerAuth()
@ApiTags('Award')
@Controller('/award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @ApiOperation({ summary: 'Get all awards' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAward(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAwardsSchema)) query: GetAwardsDTO,
  ) {
    const [awards, total] = await this.awardService.getAwards(query);
    return res.status(HttpStatus.OK).json({
      awards,
      pagination: {
        total,
        limit: query?.limit,
        offset: query?.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Add award' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveAward(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createAwardSchema)) payload: CreateAwardDTO,
  ) {
    const award = await this.awardService.saveAward(payload);
    return res.status(HttpStatus.OK).json({
      award,
    });
  }

  @ApiOperation({ summary: 'Update award' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateAward(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateAwardSchema)) payload: UpdateAwardDTO,
  ) {
    const award = await this.awardService.updateAward(id, payload);
    return res.status(HttpStatus.OK).json({
      award,
    });
  }

  @ApiOperation({ summary: 'Delete award' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteAward(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.awardService.deleteAward(id);
    return res.status(HttpStatus.OK).json({});
  }
}
