// Utilities
import {
  Index,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EventState {
  Active = 'active',
  Failed = 'failed',
  Waiting = 'waiting',
  Resumed = 'resumed',
  Cleaned = 'cleaned',
  Removed = 'removed',
  Progress = 'progress',
  Completed = 'completed',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  queueName: string;

  @Index()
  @Column()
  processName: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  data: any;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  exception: any;

  @Index()
  @Column({
    type: 'enum',
    enum: EventState,
    default: EventState.Waiting,
  })
  state: EventState;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
