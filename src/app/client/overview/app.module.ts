// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import {
  Overview,
  OverviewSchema,
} from 'src/app/client/schemas/overview.schema';

// Controller
import { OverviewController } from './controller/overview.controller';

// Services
import { OverviewService } from './service/overview.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Overview.name, schema: OverviewSchema },
    ]),
  ],
  exports: [OverviewService],
  providers: [OverviewService],
  controllers: [OverviewController],
})
export class OverviewModule {}
