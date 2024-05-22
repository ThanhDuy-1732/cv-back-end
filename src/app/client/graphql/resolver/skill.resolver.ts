// Utilities
import { Query, Resolver } from '@nestjs/graphql';

// Models
import { Skill } from '../models/skill.model';

// Services
import { SkillService } from 'src/app/client/modules/skill/service/skill.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver((of: typeof Resolver) => Skill)
export class SkillResolver {
  constructor(private skillService: SkillService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [Skill])
  async getAllSkill(): Promise<Array<Skill>> {
    return await this.skillService.findAll();
  }
}
