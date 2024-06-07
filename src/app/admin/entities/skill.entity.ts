// Utilities
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SkillItem } from './skillItem.entity';

@Entity('skills')
export class Skill {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  _id: string;

  @Column()
  type: string;

  @OneToMany(() => SkillItem, (skillItem) => skillItem.skill)
  skills: Array<SkillItem>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
