// Utilities
import {
  Index,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities
import { EducationSubInfo } from './educationSubInfo.entity';

@Entity('educations')
export class Education {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: true,
  })
  _id: string;

  @Index()
  @Column()
  time: string;

  @Index()
  @Column()
  title: string;

  @Column()
  score: string;

  @Column({
    nullable: true,
  })
  location: string;

  @OneToMany(
    () => EducationSubInfo,
    (educationSubInfo) => educationSubInfo.education,
  )
  subInfo: Array<EducationSubInfo>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
