// Utilities
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Project } from 'src/app/client/schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async findAll(): Promise<Array<Project>> {
    return this.projectModel.find().exec();
  }

  async find(id: string): Promise<Project> {
    const _id = new mongoose.Types.ObjectId(id);
    return await this.projectModel.findById(_id).exec();
  }
}
