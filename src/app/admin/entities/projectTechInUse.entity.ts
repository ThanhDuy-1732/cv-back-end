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
import { Project } from './project.entity';

@Entity('projectTeachInUse')
export class ProjectTeachInUse {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Project, (project) => project.technologyInUse)
  project: Project;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
