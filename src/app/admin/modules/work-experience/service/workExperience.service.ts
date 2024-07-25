// Utilities
import differenceBy from 'lodash/differenceBy';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { WorkExperience } from 'src/app/admin/entities/workExperience.entity';
import { WorkDescription } from 'src/app/admin/entities/workDescription.entity';

// DTOs
import {
  CreateWorkExperienceDTO,
  UpdateWorkExperienceDTO,
  GetAllWorkWExperienceDTO,
} from '../dto/workExperience.dto';

@Injectable()
export class WorkExperienceService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(WorkExperience)
    private workExperienceRepository: Repository<WorkExperience>,
    @InjectRepository(WorkDescription)
    private workDescriptionRepository: Repository<WorkDescription>,
  ) {}

  async getAllWorkExperiences(data: GetAllWorkWExperienceDTO) {
    const take = Number(data.limit || 0);
    const skip = Number(data.offset || 0) * take;

    const [workExperience, total] =
      await this.workExperienceRepository.findAndCount({
        relations: {
          description: true,
        },
        take,
        skip,
      });

    return {
      total,
      workExperience,
    };
  }

  async getWorkExperience(id: number) {
    const workExperience = await this.workExperienceRepository.findOne({
      where: {
        id,
      },
    });
    return workExperience;
  }

  async saveWorkExperience(data: CreateWorkExperienceDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const workExperience = new WorkExperience();
      workExperience._id = data._id || '';
      workExperience.time = data.time || '';
      workExperience.company = data.company || '';
      workExperience.position = data.position || '';

      const description = [];
      for (const content of data.description) {
        const item = new WorkDescription();
        item.content = content;

        const createdDescription = await queryRunner.manager.save(item);
        description.push(createdDescription);
      }

      workExperience.description = description;

      const createdWork = await queryRunner.manager.save(workExperience);

      await queryRunner.commitTransaction();

      return createdWork;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateWorkExperience(id: number, data: UpdateWorkExperienceDTO) {
    const workExperience = await this.workExperienceRepository.findOne({
      where: {
        id,
      },
    });

    if (!workExperience) {
      throw new NotFoundException('Work experience is not exist');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (data._id) {
        workExperience._id = data._id;
      }

      if (data.company) {
        workExperience.company = data.company;
      }

      if (data.position) {
        workExperience.position = data.position;
      }

      if (data.time) {
        workExperience.time = data.time;
      }

      const description = await this.workDescriptionRepository.find({
        relations: {
          work: true,
        },
        where: {
          work: {
            id,
          },
        },
      });

      const deletedDes = differenceBy(description, data.description, 'id');

      for (const des of deletedDes) {
        await queryRunner.manager.softDelete(WorkDescription, { id: des.id });
      }

      for (const des of data.description) {
        if (des.id) {
          await queryRunner.manager.save(WorkDescription, des);
          continue;
        }

        const newDes = new WorkDescription();
        newDes.content = des.content;

        const createdDes = await queryRunner.manager.save(newDes);
        description.push(createdDes);
      }

      workExperience.description = description;

      const updatedWork =
        await this.workExperienceRepository.save(workExperience);

      await queryRunner.commitTransaction();

      return updatedWork;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteWorkExperience(id: number) {
    const workExperience = await this.workExperienceRepository.findOne({
      where: {
        id,
      },
    });

    if (!workExperience) {
      throw new NotFoundException('Work experience is not exist');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const description = await this.workDescriptionRepository.find({
        relations: {
          work: true,
        },
        where: {
          work: {
            id,
          },
        },
      });

      for (const des of description) {
        await queryRunner.manager.softDelete(WorkDescription, { id: des.id });
      }

      await queryRunner.manager.softDelete(WorkExperience, { id });
      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
