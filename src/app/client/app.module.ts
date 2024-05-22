// Utilities
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Controller
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Config
import { mongodbDatabaseModule } from './config/index';

// Resolver
import { AwardResolver } from 'src/app/client/graphql/resolver/award.resolver';
import { SkillResolver } from 'src/app/client/graphql/resolver/skill.resolver';
import { ProjectResolver } from 'src/app/client/graphql/resolver/project.resolver';
import { OverviewResolver } from 'src/app/client/graphql/resolver/overview.resolver';
import { EducationResolver } from 'src/app/client/graphql/resolver/education.resolver';
import { InformationResolver } from 'src/app/client/graphql/resolver/information.resolver';
import { WorkExperienceResolver } from 'src/app/client/graphql/resolver/work-experience.resolver';

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

    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AwardResolver,
    SkillResolver,
    ProjectResolver,
    OverviewResolver,
    EducationResolver,
    InformationResolver,
    WorkExperienceResolver,
  ],
})
export class AppClientModule {}
