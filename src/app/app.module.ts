// Utilities
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

// Controller
import { AppController } from './app.controller';

// Service
import { AppService } from './app.service';

// Config
import { mongodbDatabaseModule } from '../config/index';

// Schema
import { Comment, CommentSchema } from 'src/schemas/comment.schema';

// Resolver
import { CommentResolver } from 'src/graphql/resolver/comments.resolver';

// Directives
import { lowerDirectiveTransform } from 'src/graphql/directives/upper.directives';

@Module({
  imports: [
    ...mongodbDatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      transformSchema: (schema) => lowerDirectiveTransform(schema, 'lower'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'lower',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, CommentResolver],
})
export class AppModule {}
