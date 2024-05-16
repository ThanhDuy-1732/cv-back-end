// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Overview } from 'src/app/client/schemas/overview.schema';

@Injectable()
export class OverviewService {
  constructor(
    @InjectModel(Overview.name) private overviewModel: Model<Overview>,
  ) {}

  async findAll(): Promise<Array<Overview>> {
    return this.overviewModel.find().exec();
  }
}
