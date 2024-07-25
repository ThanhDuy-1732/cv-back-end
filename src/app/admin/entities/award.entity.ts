// Utilities
import {
  Index,
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn()
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
  position: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
