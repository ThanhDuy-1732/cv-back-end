// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { EducationService } from './service/education.service';

// Controller
import { EducationController } from './controller/education.controller';

// Entities
import { Education } from '../../entities/education.entity';
import { EducationSubInfo } from '../../entities/educationSubInfo.entity';

@Module({
  exports: [EducationService],
  providers: [EducationService],
  controllers: [EducationController],
  imports: [TypeOrmModule.forFeature([Education, EducationSubInfo])],
})
export class EducationModule {}
