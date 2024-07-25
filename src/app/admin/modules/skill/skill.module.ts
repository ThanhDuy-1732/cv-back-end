// Utilities
import { Module } from '@nestjs/common';

// Services
import { SkillService } from './service/skill.service';

// Controller
import { SkillController } from './controller/skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Skill } from '../../entities/skill.entity';
import { SkillItem } from '../../entities/skillItem.entity';

@Module({
  exports: [SkillService],
  providers: [SkillService],
  controllers: [SkillController],
  imports: [TypeOrmModule.forFeature([Skill, SkillItem])],
})
export class SkillModule {}
