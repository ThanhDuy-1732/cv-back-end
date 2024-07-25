// Utilities
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './controllers/app.controller';

// Services
import { AppService } from './services/app.service';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { AwardModule } from './modules/award/award.module';
import { EventModule } from './modules/event/event.module';
import { ProjectModule } from './modules/project/project.module';
import { OverviewModule } from './modules/overview/overview.module';
import { EducationModule } from './modules/education/education.module';
import { InformationModule } from './modules/information/information.module';
import { databaseModules, cacheModules, queueModules } from './config/index';
import { WorkExperienceModule } from './modules/work-experience/workExperience.module';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [
    ...cacheModules,
    ...queueModules,
    ...databaseModules,

    AuthModule,
    UserModule,
    AwardModule,
    SkillModule,
    EventModule,
    ProjectModule,
    OverviewModule,
    EducationModule,
    InformationModule,
    WorkExperienceModule,
    ConfigModule.forRoot(),
  ],
})
export class AppAdminModule {
  constructor(private dataSource: DataSource) {}
}
