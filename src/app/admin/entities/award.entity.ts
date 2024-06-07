// Utilities
import {
  Index,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('awards')
export class Award {
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
  location: string;

  @Column()
  postion: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
