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

@Entity('projectURLs')
export class ProjectURL {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Project, (project) => project.url)
  project: Project;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
