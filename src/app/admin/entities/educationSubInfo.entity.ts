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
import { Education } from './education.entity';

@Entity('educationSubInfos')
export class EducationSubInfo {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Education, (education) => education.subInfo)
  education: Education;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
