// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Project, ProjectSchema } from '../schemas/project.schema';

// Controllers
import { ProjectController } from './controller/project.controller';

// Services
import { ProjectService } from './service/project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  exports: [ProjectService],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
