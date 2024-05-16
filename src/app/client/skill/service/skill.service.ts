// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Skill } from 'src/app/client/schemas/skill.schema';

@Injectable()
export class SkillService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findAll(): Promise<Array<Skill>> {
    return await this.skillModel.find().exec();
  }
}
