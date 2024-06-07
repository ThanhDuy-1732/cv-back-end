import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SessionState {
  Active = 'active',
  InActive = 'inActive',
}

export enum SessionType {
  Token = 'token',
  RefreshToken = 'refreshToken',
}

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column({
    type: 'enum',
    enum: SessionState,
    default: SessionState.InActive,
  })
  state: SessionState;

  @Column({
    type: 'enum',
    enum: SessionType,
    default: SessionType.Token,
  })
  type: SessionType;

  @Column({
    nullable: true,
  })
  userAgent: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  expiredDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
