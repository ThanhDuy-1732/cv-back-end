// Utilities
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controller
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Config
import { mongodbDatabaseModule } from './config/index';

// Modules
import { AwardModule } from './modules/award/app.module';
import { SkillModule } from './modules/skill/app.module';
import { ProjectModule } from './modules/project/app.module';
import { OverviewModule } from './modules/overview/app.module';
import { EducationModule } from './modules/education/app.module';
import { InformationModule } from './modules/information/app.module';
import { WorkExperienceModule } from './modules/work-experience/app.module';

@Module({
  imports: [
    AwardModule,
    SkillModule,
    ProjectModule,
    OverviewModule,
    EducationModule,
    InformationModule,
    WorkExperienceModule,
    ConfigModule.forRoot(),
    ...mongodbDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppClientModule {}
