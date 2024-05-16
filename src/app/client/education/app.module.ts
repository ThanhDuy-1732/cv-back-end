// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Education, EducationSchema } from '../schemas/education.schema';

// Controllers
import { EducationController } from './controller/eduction.controller';

// Services
import { EducationService } from './service/education.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Education.name, schema: EducationSchema },
    ]),
  ],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
