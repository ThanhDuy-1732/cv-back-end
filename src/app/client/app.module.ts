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
import { AwardModule } from './award/app.module';
import { SkillModule } from './skill/app.module';
import { ProjectModule } from './project/app.module';
import { OverviewModule } from './overview/app.module';
import { EducationModule } from './education/app.module';
import { InformationModule } from './information/app.module';
import { WorkExperienceModule } from './work-experience/app.module';

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
