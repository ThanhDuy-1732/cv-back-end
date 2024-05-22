// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { Overview } from '../models/overview.model';

// Services
import { OverviewService } from 'src/app/client/modules/overview/service/overview.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Overview)
export class OverviewResolver {
  constructor(private overviewService: OverviewService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Overview])
  async getAllOverview(): Promise<Array<Overview>> {
    return await this.overviewService.findAll();
  }
}
