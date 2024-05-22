// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { Information } from '../models/information.model';

// Services
import { InformationService } from 'src/app/client/modules/information/service/information.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Information)
export class InformationResolver {
  constructor(private informationService: InformationService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Information])
  async getAllInformation(): Promise<Array<Information>> {
    return await this.informationService.findAll();
  }
}
