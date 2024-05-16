// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Award, AwardSchema } from 'src/app/client/schemas/award.schema';

// Controller
import { AwardController } from './controller/award.controller';

// Services
import { AwardsService } from './service/award.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Award.name, schema: AwardSchema }]),
  ],
  exports: [AwardsService],
  providers: [AwardsService],
  controllers: [AwardController],
})
export class AwardModule {}
