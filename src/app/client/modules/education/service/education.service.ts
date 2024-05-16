// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Education } from 'src/app/client/schemas/education.schema';

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name) private educationModel: Model<Education>,
  ) {}

  async findAll(): Promise<Array<Education>> {
    return await this.educationModel.find().exec();
  }
}
