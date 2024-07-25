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
  Controller,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// Services
import { InformationService } from '../service/information.service';

// DTOs
import {
  GetInformationDTO,
  CreateInformationDTO,
  getInformationSchema,
  UpdateInformationDTO,
  createInformationSchema,
  updateInformationSchema,
} from '../dto/information.dto';

@ApiBearerAuth()
@ApiTags('Information')
@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  @ApiOperation({ summary: 'Get all information' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllInformation(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getInformationSchema))
    query: GetInformationDTO,
  ) {
    const { information, total } =
      await this.informationService.getAllInformation(query);

    return res.status(HttpStatus.OK).json({
      information,
      pagination: {
        total,
        limit: query?.limit,
        offset: query?.offset,
      },
    });
  }

  @ApiOperation({ summary: 'Save information' })
  @Post()
  @UseGuards(JwtAuthGuard)
  async saveInformation(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createInformationSchema))
    payload: CreateInformationDTO,
  ) {
    const information = await this.informationService.saveInformation(payload);
    return res.status(HttpStatus.OK).json({
      information,
    });
  }

  @ApiOperation({ summary: 'Update information' })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateInformation(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateInformationSchema))
    payload: UpdateInformationDTO,
  ) {
    const information = await this.informationService.updateInformation(
      id,
      payload,
    );
    return res.status(HttpStatus.OK).json({
      information,
    });
  }

  @ApiOperation({ summary: 'Delete information' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteInformation(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.informationService.deleteInformation(id);
    return res.status(HttpStatus.OK).json({});
  }
}
