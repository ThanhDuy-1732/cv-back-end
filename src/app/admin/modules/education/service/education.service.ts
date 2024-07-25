// Utilities
import differenceBy from 'lodash/differenceBy';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { Education } from 'src/app/admin/entities/education.entity';
import { EducationSubInfo } from 'src/app/admin/entities/educationSubInfo.entity';

// DTOs
import {
  GetEducationDTO,
  UpdateSubInfoDTO,
  CreateEducationDTO,
  UpdateEducationDTO,
} from '../dto/education.dto';

@Injectable()
export class EducationService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    @InjectRepository(EducationSubInfo)
    private eduSubInfoRepository: Repository<EducationSubInfo>,
  ) {}

  async getEducation(data: GetEducationDTO) {
    const take = Number(data?.limit || 0);
    const skip = Number(data?.offset || 0) * take;

    const educations = await this.educationRepository.findAndCount({
      relations: {
        subInfo: true,
      },
      take,
      skip,
      withDeleted: false,
    });

    return educations;
  }

  async saveEducation(data: CreateEducationDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const education = new Education();
      education._id = data._id || '';
      education.time = data.time || '';
      education.score = data.score || '';
      education.title = data.title || '';
      education.location = data.location || '';

      const subInfo = [];
      for (const info of data.subInfo) {
        const eduSubInfo = new EducationSubInfo();
        eduSubInfo.content = info.content || '';
        const createdSubInfo = await queryRunner.manager.save(eduSubInfo);
        subInfo.push(createdSubInfo);
      }

      education.subInfo = subInfo;

      await queryRunner.manager.save(education);

      await queryRunner.commitTransaction();

      return education;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return;
  }

  async updateEduSubInfo({
    id,
    subInfo,
    queryRunner,
  }: {
    id: number;
    queryRunner: QueryRunner;
    subInfo: Array<UpdateSubInfoDTO>;
  }): Promise<Array<EducationSubInfo>> {
    const eduSubInfo = await this.eduSubInfoRepository.find({
      relations: {
        education: true,
      },
      where: {
        education: {
          id,
        },
      },
    });

    const deleteSubInfo = differenceBy(eduSubInfo, subInfo, 'id');
    for (const info of deleteSubInfo) {
      await queryRunner.manager.softDelete(EducationSubInfo, { id: info.id });
    }

    for (const info of subInfo) {
      if (info.id) {
        await queryRunner.manager.save(EducationSubInfo, info);
        continue;
      }

      const newSubInfo = new EducationSubInfo();
      newSubInfo.content = info.content;

      const createdSubInfo = await queryRunner.manager.save(newSubInfo);
      eduSubInfo.push(createdSubInfo);
    }

    return eduSubInfo;
  }

  async updateEducation(id: number, data: UpdateEducationDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const education = await this.educationRepository.findOne({
        where: {
          id,
        },
      });

      if (!education) {
        throw new NotFoundException('Education not found');
      }

      if (data._id) {
        education._id = data._id;
      }

      if (data.location) {
        education.location = data.location;
      }

      if (data.score) {
        education.score = data.score;
      }

      if (data.time) {
        education.time = data.time;
      }

      if (data.title) {
        education.title = data.title;
      }

      const subInfo = await this.updateEduSubInfo({
        id,
        queryRunner,
        subInfo: data.subInfo,
      });

      education.subInfo = subInfo;
      await queryRunner.manager.save(education);

      await queryRunner.commitTransaction();

      return education;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteEducation(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const education = await this.educationRepository.findOne({
        where: {
          id,
        },
        relations: {
          subInfo: true,
        },
      });

      if (!education) {
        throw new NotFoundException('Education not found');
      }

      for (const info of education.subInfo) {
        await queryRunner.manager.softDelete(EducationSubInfo, { id: info.id });
      }

      await queryRunner.manager.softDelete(Education, { id });
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return;
  }
}
