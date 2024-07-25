// Utilities
import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { WorkDescription } from './workDescription.entity';

@Entity('workExperiences')
export class WorkExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  _id: string;

  @Column()
  time: string;

  @Column()
  company: string;

  @Column()
  position: string;

  @OneToMany(() => WorkDescription, (description) => description.work)
  description: Array<WorkDescription>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
