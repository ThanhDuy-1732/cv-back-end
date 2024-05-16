// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { WorkExperience } from 'src/app/client/schemas/work-experience.schema';

@Injectable()
export class WorkExperienceService {
  constructor(
    @InjectModel(WorkExperience.name)
    private workExperienceModel: Model<WorkExperience>,
  ) {}

  async findAll(): Promise<Array<WorkExperience>> {
    return await this.workExperienceModel.find().exec();
  }
}
