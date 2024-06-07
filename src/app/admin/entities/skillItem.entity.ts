// Utilities
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities
import { Skill } from './skill.entity';

@Entity('skillItems')
export class SkillItem {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Skill, (skill) => skill.skills)
  skill: Skill;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
