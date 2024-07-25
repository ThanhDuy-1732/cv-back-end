// Utilities
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { Overview } from 'src/app/admin/entities/overview.entity';

// DTOs
import {
  GetOverviewDTO,
  CreateOverviewDTO,
  UpdateOverviewDTO,
} from '../dto/overview.dto';

@Injectable()
export class OverviewService {
  constructor(
    @InjectRepository(Overview)
    private overviewRepository: Repository<Overview>,
  ) {}

  async getAllOverview(data: GetOverviewDTO) {
    const take = Number(data?.limit || 0);
    const skip = Number(data?.offset) * take;
    const [overview, total] = await this.overviewRepository.findAndCount({
      skip,
      take,
    });

    return {
      total,
      overview,
    };
  }

  async saveOverview(data: CreateOverviewDTO) {
    const overview = new Overview();
    overview._id = data?._id || '';
    overview.value = data?.value || '';

    await this.overviewRepository.save(overview);
    return overview;
  }

  async updateOverview(id: number, data: UpdateOverviewDTO) {
    const overview = await this.overviewRepository.findOne({
      where: {
        id,
      },
    });

    if (!overview) {
      throw new NotFoundException('Overview is not exist');
    }

    if (data._id) {
      overview._id = data._id;
    }

    if (data.value) {
      overview.value = data.value;
    }

    await this.overviewRepository.save(overview);

    return overview;
  }

  async deleteOverview(id: number) {
    await this.overviewRepository.softDelete(id);
    return;
  }
}
