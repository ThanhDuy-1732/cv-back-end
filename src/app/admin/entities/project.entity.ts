// Utilities
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities
import { ProjectURL } from './projectURL.entity';
import { ProjectMainTeach } from './projectMainTech.entity';
import { ProjectTeachInUse } from './projectTechInUse.entity';
import { ProjectResponsibility } from './projectResAndAchi.entity';

@Entity('projects')
export class Project {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  _id: string;

  @Column()
  name: string;

  @Column()
  time: string;

  @OneToMany(() => ProjectURL, (projectURL) => projectURL.project)
  url: Array<ProjectURL>;

  @Column({ nullable: true })
  company: string;

  @Column()
  position: string;

  @OneToMany(
    () => ProjectMainTeach,
    (projectMainTeach) => projectMainTeach.project,
  )
  mainTechs: Array<ProjectMainTeach>;

  @Column()
  description: string;

  @Column()
  numberOfMember: number;

  @OneToMany(
    () => ProjectTeachInUse,
    (projectTeachInUse) => projectTeachInUse.project,
  )
  technologyInUse: Array<ProjectTeachInUse>;

  @OneToMany(
    () => ProjectResponsibility,
    (projectResponsibility) => projectResponsibility.project,
  )
  responsibilitiesAndAchievement: Array<ProjectResponsibility>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
