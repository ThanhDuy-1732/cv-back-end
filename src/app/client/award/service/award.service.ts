// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Award } from 'src/app/client/schemas/award.schema';

@Injectable()
export class AwardsService {
  constructor(@InjectModel(Award.name) private awardModel: Model<Award>) {}

  async findAll(): Promise<Array<Award>> {
    return await this.awardModel.find().exec();
  }
}
