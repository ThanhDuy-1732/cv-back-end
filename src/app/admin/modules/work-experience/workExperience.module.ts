// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { WorkExperienceService } from './service/workExperience.service';

// Controller
import { workExperienceController } from './controller/workExperience.controller';

// Entities
import { WorkExperience } from '../../entities/workExperience.entity';
import { WorkDescription } from '../../entities/workDescription.entity';

@Module({
  exports: [WorkExperienceService],
  providers: [WorkExperienceService],
  controllers: [workExperienceController],
  imports: [TypeOrmModule.forFeature([WorkExperience, WorkDescription])],
})
export class WorkExperienceModule {}
