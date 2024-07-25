// Utilities
import differenceBy from 'lodash/differenceBy';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { Skill } from 'src/app/admin/entities/skill.entity';
import { SkillItem } from 'src/app/admin/entities/skillItem.entity';

// DTOs
import {
  CreateSkillDTO,
  GetAllSkillDTO,
  UpdateSkillDTO,
} from '../dto/skill.dto';

@Injectable()
export class SkillService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
    @InjectRepository(SkillItem)
    private skillItemRepository: Repository<SkillItem>,
  ) {}

  async getAllSkill(data: GetAllSkillDTO) {
    const take = Number(data?.limit || 0);
    const skip = take * Number(data.offset || 0);

    const [skills, total] = await this.skillRepository.findAndCount({
      relations: {
        skills: true,
      },
      take,
      skip,
    });

    return {
      total,
      skills,
    };
  }

  async saveSkill(data: CreateSkillDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const skill = new Skill();
      skill._id = data._id;
      skill.type = data.type;

      const items = [];
      for (const item of data.skills) {
        const skill = new SkillItem();
        skill.content = item;

        const createdItem = await queryRunner.manager.save(skill);
        items.push(createdItem);
      }

      skill.skills = items;

      const createdSkill = await queryRunner.manager.save(skill);

      await queryRunner.commitTransaction();
      return createdSkill;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateSkill(id: number, data: UpdateSkillDTO) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const items = await this.skillItemRepository.find({
        relations: {
          skill: true,
        },
        where: {
          skill: {
            id,
          },
        },
      });

      const deletedItem = differenceBy(items, data.skills, 'id');

      for (const item of deletedItem) {
        await queryRunner.manager.softDelete(SkillItem, { id: item.id });
      }

      for (const item of data.skills) {
        if (item.id) {
          await queryRunner.manager.save(SkillItem, item);
          continue;
        }

        const newItem = new SkillItem();
        newItem.content = item.content;

        const createdItem = await queryRunner.manager.save(newItem);
        items.push(createdItem);
      }

      skill.skills = items;
      const updatedSkill = await queryRunner.manager.save(skill);

      await queryRunner.commitTransaction();
      return updatedSkill;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteSkill(id: number) {
    const skill = await this.skillRepository.findOne({
      where: {
        id,
      },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const items = await this.skillItemRepository.find({
        relations: {
          skill: true,
        },
        where: {
          skill: {
            id,
          },
        },
      });

      for (const item of items) {
        await queryRunner.manager.softDelete(SkillItem, { id: item.id });
      }

      await queryRunner.manager.softDelete(Skill, { id: skill.id });

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
