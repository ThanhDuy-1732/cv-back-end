// Utilities
import differenceBy from 'lodash/differenceBy';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { Project } from 'src/app/admin/entities/project.entity';
import { ProjectURL } from 'src/app/admin/entities/projectURL.entity';
import { ProjectMainTeach } from 'src/app/admin/entities/projectMainTech.entity';
import { ProjectTeachInUse } from 'src/app/admin/entities/projectTechInUse.entity';
import { ProjectResponsibility } from 'src/app/admin/entities/projectResAndAchi.entity';

// DTOs
import {
  CreateProjectDTO,
  GetAllProjectDTO,
  UpdateProjectDTO,
} from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    private dateSource: DataSource,
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(ProjectURL)
    private projectURLRepository: Repository<ProjectURL>,
    @InjectRepository(ProjectMainTeach)
    private projectMainTeachRepository: Repository<ProjectMainTeach>,
    @InjectRepository(ProjectTeachInUse)
    private projectTechInUseRepository: Repository<ProjectTeachInUse>,
    @InjectRepository(ProjectResponsibility)
    private projectResRepository: Repository<ProjectResponsibility>,
  ) {}

  async getAllProjects(data: GetAllProjectDTO) {
    const take = Number(data?.limit || 0);
    const skip = Number(data?.offset || 0) * take;

    const [projects, total] = await this.projectRepository.findAndCount({
      relations: {
        url: true,
        mainTechs: true,
        technologyInUse: true,
        responsibilitiesAndAchievement: true,
      },
      skip,
      take,
    });

    return {
      total,
      projects,
    };
  }

  async getProject(id: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    return project;
  }

  async saveProject(data: CreateProjectDTO) {
    const queryRunner = this.dateSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const project = new Project();

      project._id = data._id || '';
      project.company = data.company || '';
      project.name = data.name || '';
      project.description = data.description || '';
      project.numberOfMember = data.numberOfMember || 1;
      project.position = data.position || '';
      project.time = data.time || '';

      const mainTechs = [];

      for (const content of data.mainTechs) {
        const tech = new ProjectMainTeach();
        tech.content = content;
        const createdTech = await queryRunner.manager.save(tech);

        mainTechs.push(createdTech);
      }

      project.mainTechs = mainTechs;

      const urls = [];

      for (const uri of data.url) {
        const url = new ProjectURL();
        url.content = uri;

        const createdUrl = await queryRunner.manager.save(url);

        urls.push(createdUrl);
      }

      project.url = urls;

      const techInUse = [];

      for (const content of data.technologyInUse) {
        const tech = new ProjectTeachInUse();
        tech.content = content;

        const createdTech = await queryRunner.manager.save(tech);

        techInUse.push(createdTech);
      }

      project.technologyInUse = techInUse;

      const responsibilities = [];

      for (const content of data.responsibilitiesAndAchievement) {
        const responsibility = new ProjectResponsibility();
        responsibility.content = content;

        const createdResponsibility =
          await queryRunner.manager.save(responsibility);

        responsibilities.push(createdResponsibility);
      }

      project.responsibilitiesAndAchievement = responsibilities;

      const createdProject = await queryRunner.manager.save(project);

      await queryRunner.commitTransaction();
      return createdProject;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateProject(id: number, data: UpdateProjectDTO) {
    const queryRunner = this.dateSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const project = await this.projectRepository.findOne({
        where: {
          id,
        },
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      if (data._id) {
        project._id = data._id;
      }

      if (data.company) {
        project.company = data.company;
      }

      if (data.description) {
        project.description = data.description;
      }

      if (data.name) {
        project.name = data.name;
      }

      if (data.numberOfMember) {
        project.numberOfMember = data.numberOfMember;
      }

      if (data.position) {
        project.position = data.position;
      }

      if (data.time) {
        project.time = data.time;
      }

      if (data.numberOfMember) {
        project.numberOfMember = data.numberOfMember;
      }

      const mainTechs = await this.projectMainTeachRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      const deletedMainTechs = differenceBy(mainTechs, data.mainTechs, 'id');

      for (const tech of deletedMainTechs) {
        await this.dateSource.manager.softDelete(ProjectMainTeach, {
          id: tech.id,
        });
      }

      for (const tech of data.mainTechs) {
        if (tech.id) {
          await queryRunner.manager.save(ProjectMainTeach, tech);
          continue;
        }

        const newTech = new ProjectMainTeach();
        newTech.content = tech.content;

        const createdTech = await this.dateSource.manager.save(newTech);
        mainTechs.push(createdTech);
      }

      project.mainTechs = mainTechs;

      const urls = await this.projectURLRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      const deletedURLs = differenceBy(urls, data.url, 'id');

      for (const url of deletedURLs) {
        await queryRunner.manager.softDelete(ProjectURL, { id: url.id });
      }

      for (const url of data.url) {
        if (url.id) {
          await queryRunner.manager.save(ProjectURL, url);
          continue;
        }

        const newUrl = new ProjectURL();
        newUrl.content = url.content;

        const createdNewURL = await queryRunner.manager.save(newUrl);
        urls.push(createdNewURL);
      }

      project.url = urls;

      const techInUse = await this.projectTechInUseRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      const deletedTechInUse = differenceBy(
        techInUse,
        data.technologyInUse,
        'id',
      );

      for (const tech of deletedTechInUse) {
        await queryRunner.manager.softDelete(ProjectTeachInUse, {
          id: tech.id,
        });
      }

      for (const tech of data.technologyInUse) {
        if (tech.id) {
          await queryRunner.manager.save(ProjectTeachInUse, tech);
          continue;
        }

        const newTech = new ProjectTeachInUse();
        newTech.content = tech.content;
        const createdTech = await this.dateSource.manager.save(
          ProjectTeachInUse,
          newTech,
        );
        techInUse.push(createdTech);
      }

      project.technologyInUse = techInUse;

      const responsibilities = await this.projectResRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      const deletedRes = differenceBy(
        responsibilities,
        data.responsibilitiesAndAchievement,
        'id',
      );

      for (const responsibility of deletedRes) {
        await queryRunner.manager.softDelete(ProjectResponsibility, {
          id: responsibility.id,
        });
      }

      for (const responsibility of data.responsibilitiesAndAchievement) {
        if (responsibility.id) {
          await queryRunner.manager.save(ProjectResponsibility, responsibility);
          continue;
        }

        const newRes = new ProjectResponsibility();
        newRes.content = responsibility.content;

        const createdRes = await queryRunner.manager.save(newRes);
        responsibilities.push(createdRes);
      }

      project.responsibilitiesAndAchievement = responsibilities;

      const updatedProject = await queryRunner.manager.save(Project, project);

      await queryRunner.commitTransaction();
      return updatedProject;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteProject(id: number) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const queryRunner = this.dateSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const urls = await this.projectURLRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      for (const url of urls) {
        await queryRunner.manager.softDelete(ProjectURL, { id: url.id });
      }

      const mainTechs = await this.projectMainTeachRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      for (const tech of mainTechs) {
        await queryRunner.manager.softDelete(ProjectMainTeach, { id: tech.id });
      }

      const techInUse = await this.projectTechInUseRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      for (const tech of techInUse) {
        await queryRunner.manager.softDelete(ProjectTeachInUse, {
          id: tech.id,
        });
      }

      const responsibilities = await this.projectResRepository.find({
        relations: {
          project: true,
        },
        where: {
          project: {
            id,
          },
        },
      });

      for (const responsibility of responsibilities) {
        await queryRunner.manager.softDelete(ProjectResponsibility, {
          id: responsibility.id,
        });
      }

      await queryRunner.manager.softDelete(Project, { id: project.id });

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
