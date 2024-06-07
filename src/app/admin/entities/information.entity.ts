// Utilities
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum InformationTitleEnum {
  DOB = 'DOB',
  Phone = 'Phone',
  Email = 'Email',
  Other = 'Other',
  Github = 'Github',
  Address = 'Address',
}

@Entity('information')
export class Information {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable: true,
  })
  _id: string;

  @Column({
    type: 'enum',
    enum: InformationTitleEnum,
    default: InformationTitleEnum.Other,
  })
  title: InformationTitleEnum;

  @Column()
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
