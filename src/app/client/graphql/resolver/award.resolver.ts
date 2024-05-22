// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { Award } from '../models/award.model';

// Services
import { AwardsService } from 'src/app/client/modules/award/service/award.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Award)
export class AwardResolver {
  constructor(private awardService: AwardsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Award])
  async getAllAward(): Promise<Array<Award>> {
    return await this.awardService.findAll();
  }
}
