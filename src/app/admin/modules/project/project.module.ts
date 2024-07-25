// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { ProjectService } from './service/project.service';

// Controller
import { ProjectController } from './controller/project.controller';

// Entities
import { Project } from '../../entities/project.entity';
import { ProjectURL } from '../../entities/projectURL.entity';
import { ProjectMainTeach } from '../../entities/projectMainTech.entity';
import { ProjectTeachInUse } from '../../entities/projectTechInUse.entity';
import { ProjectResponsibility } from '../../entities/projectResAndAchi.entity';

@Module({
  exports: [ProjectService],
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectURL,
      ProjectMainTeach,
      ProjectTeachInUse,
      ProjectResponsibility,
    ]),
  ],
})
export class ProjectModule {}
