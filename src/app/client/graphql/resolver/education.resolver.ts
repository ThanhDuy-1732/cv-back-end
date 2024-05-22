// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { Education } from '../models/education.model';

// Services
import { EducationService } from 'src/app/client/modules/education/service/education.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Education)
export class EducationResolver {
  constructor(private educationService: EducationService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Education])
  async getAllEduction(): Promise<Array<Education>> {
    return await this.educationService.findAll();
  }
}
