// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import {
  Information,
  InformationSchema,
} from 'src/app/client/schemas/information.schema';

// Controller
import { InformationController } from './controller/information.controller';

// Services
import { InformationService } from './service/information.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Information.name, schema: InformationSchema },
    ]),
  ],
  exports: [InformationService],
  providers: [InformationService],
  controllers: [InformationController],
})
export class InformationModule {}
