// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { WorkExperience } from '../models/work-experience.model';

// Services
import { WorkExperienceService } from 'src/app/client/modules/work-experience/service/work-experience.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => WorkExperience)
export class WorkExperienceResolver {
  constructor(private workExperienceService: WorkExperienceService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [WorkExperience])
  async getAllWorkExperience(): Promise<Array<WorkExperience>> {
    return await this.workExperienceService.findAll();
  }
}
