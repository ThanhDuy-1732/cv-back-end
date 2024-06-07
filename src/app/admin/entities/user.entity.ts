import {
  Index,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRoles {
  User = 'user',
  Admin = 'admin',
  System = 'system',
  Manager = 'manager',
}

export enum UserState {
  Active = 'active',
  InActive = 'inActive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.User,
  })
  @Index()
  type: UserRoles;

  @Column({
    type: 'enum',
    enum: UserState,
    default: UserState.InActive,
  })
  @Index()
  state: UserState;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
