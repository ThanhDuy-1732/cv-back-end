// Utilities
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Award } from 'src/app/admin/entities/award.entity';

// DTO
import { CreateAwardDTO, GetAwardsDTO, UpdateAwardDTO } from '../dto/award.dto';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award) private awardRepository: Repository<Award>,
  ) {}

  async getAwards(data: GetAwardsDTO) {
    const take = Number(data.limit || 0);
    const skip = Number(data.offset || 0) * Number(take);
    const awards = await this.awardRepository.findAndCount({
      skip,
      take,
      withDeleted: false,
    });

    return awards;
  }

  async saveAward(data: CreateAwardDTO) {
    const award = new Award();
    award._id = data._id || '';
    award.time = data.time || '';
    award.title = data.title || '';
    award.location = data.location || '';
    award.position = data.position || '';

    await this.awardRepository.save(award);
    return award;
  }

  async updateAward(id: number, data: UpdateAwardDTO) {
    const award = await this.awardRepository.findOne({
      where: {
        id,
      },
    });

    if (!award) {
      throw new NotFoundException('Award not found');
    }

    if (data._id) {
      award._id = data._id;
    }

    if (data.location) {
      award.location = data.location;
    }

    if (data.position) {
      award.position = data.position;
    }

    if (data.time) {
      award.time = data.time;
    }

    if (data.title) {
      award.title = data.title;
    }

    await this.awardRepository.save(award);

    return award;
  }

  async deleteAward(id: number) {
    await this.awardRepository.softDelete(id);
    return;
  }
}
