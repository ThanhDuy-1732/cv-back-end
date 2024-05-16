// Utilities
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { Skill, SkillSchema } from 'src/app/client/schemas/skill.schema';

// Services
import { SkillService } from './service/skill.service';

// Controller
import { SkillController } from './controller/skill.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  exports: [SkillService],
  providers: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
