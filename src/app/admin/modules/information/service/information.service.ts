// Utilities
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Utilities
import { Information } from 'src/app/admin/entities/information.entity';

// DTOs
import {
  CreateInformationDTO,
  GetInformationDTO,
  UpdateInformationDTO,
} from '../dto/information.dto';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>,
  ) {}

  async getAllInformation(data: GetInformationDTO) {
    const take = Number(data.limit || 0);
    const skip = Number(data.offset || 0) * take;

    const [information, total] = await this.informationRepository.findAndCount({
      take,
      skip,
    });

    return {
      total,
      information,
    };
  }

  async saveInformation(data: CreateInformationDTO) {
    const information = new Information();
    information.title = data.title;
    information._id = data._id || '';
    information.content = data.content || '';

    await this.informationRepository.save(information);
    return information;
  }

  async updateInformation(id: number, data: UpdateInformationDTO) {
    const information = await this.informationRepository.findOne({
      where: {
        id,
      },
    });

    if (!information) {
      throw new NotFoundException('Information is not exist');
    }

    if (data._id) {
      information._id = data._id;
    }

    if (data.content) {
      information.content = data.content;
    }

    if (data.title) {
      information.title = data.title;
    }

    await this.informationRepository.save(information);
    return information;
  }

  async deleteInformation(id: number) {
    await this.informationRepository.softDelete(id);
    return;
  }
}
