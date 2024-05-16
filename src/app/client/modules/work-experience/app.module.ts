// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import {
  WorkExperience,
  WorkExperienceSchema,
} from 'src/app/client/schemas/work-experience.schema';

// Services
import { WorkExperienceService } from './service/work-experience.service';

// Controllers
import { WorkExperienceController } from './controller/work-experience.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkExperience.name, schema: WorkExperienceSchema },
    ]),
  ],
  exports: [WorkExperienceService],
  providers: [WorkExperienceService],
  controllers: [WorkExperienceController],
})
export class WorkExperienceModule {}
