// Utilities
import {
  Column,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('overviews')
export class Overview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  _id: string;

  @Column()
  value: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
