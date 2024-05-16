// Utilities
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Schemas
import { Information } from 'src/app/client/schemas/information.schema';

@Injectable()
export class InformationService {
  constructor(
    @InjectModel(Information.name) private infomationModel: Model<Information>,
  ) {}

  async findAll(): Promise<Array<Information>> {
    return this.infomationModel.find().exec();
  }
}
