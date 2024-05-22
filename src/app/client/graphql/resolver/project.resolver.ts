// Utilities
import { Args, Query, Resolver } from '@nestjs/graphql';

// Models
import { Project } from '../models/project.model';

// Services
import { ProjectService } from 'src/app/client/modules/project/service/project.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Project])
  async getAllProject(): Promise<Array<Project>> {
    return await this.projectService.findAll();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => Project)
  async getProject(@Args('id') id: string): Promise<Project> {
    return await this.projectService.find(id);
  }
}
