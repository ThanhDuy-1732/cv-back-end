// Utilities
import { PubSub } from 'graphql-subscriptions';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

// Schemes
import { Comment } from 'src/graphql/models/comment.model';

// Services
import { AppService } from 'src/app/app.service';

// InputType
import { CreateCommentInputType } from 'src/graphql/inputType/comment.inputType';

const pubSub = new PubSub();

@Resolver((of: typeof Resolver) => Comment)
export class CommentResolver {
  constructor(private appService: AppService) {}

  @Query((_) => [Comment])
  async getAllComment(): Promise<Comment[]> {
    return await this.appService.getComments();
  }

  @Query((_) => Comment)
  async getComment(@Args('name') name: string) {
    return await this.appService.getComment(name);
  }

  @Mutation((_) => Comment)
  async createComment(@Args('data') data: CreateCommentInputType) {
    pubSub.publish('commentAdd', { commentAddData: data });

    return await this.appService.createComment(data);
  }

  @Subscription((_) => Comment, {
    name: 'commentAddData',
    resolve: (value) => value.commentAddData,
  })
  commentAdd() {
    return pubSub.asyncIterator('commentAdd');
  }
}
