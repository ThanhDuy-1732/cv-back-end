// Utilities
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('overviews')
export class Overview {
  @PrimaryColumn()
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
