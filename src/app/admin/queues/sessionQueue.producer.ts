// Utilities
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Constants
import { QUEUES } from '../constants/queue';

// Entities
import { Session } from '../entities/session.entity';
import { Event, EventState } from '../entities/event.entity';

@Injectable()
export class SessionQueueProducer {
  constructor(
    @InjectQueue(QUEUES.SESSION) private sessionQueue: Queue,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async producerSessionAddedEvent(session: Session) {
    const event = new Event();

    event.data = session;
    event.state = EventState.Waiting;

    event.queueName = QUEUES.SESSION;
    event.processName = 'sessionAdded';

    await this.eventRepository.save(event);

    await this.sessionQueue.add(event.processName, event.data, {
      jobId: event.id,
      removeOnFail: true,
      removeOnComplete: true,
    });
  }

  async producerSessionUpdatedEvent(session: Session) {
    const event = new Event();

    event.data = session;
    event.state = EventState.Waiting;

    event.queueName = QUEUES.SESSION;
    event.processName = 'sessionUpdated';

    await this.eventRepository.save(event);

    await this.sessionQueue.add(event.processName, event.data, {
      jobId: event.id,
      removeOnFail: true,
      removeOnComplete: true,
    });
  }

  async producerSessionDeletedEvent(session: Session) {
    const event = new Event();

    event.data = session;
    event.state = EventState.Waiting;

    event.queueName = QUEUES.SESSION;
    event.processName = 'sessionDeleted';

    await this.eventRepository.save(event);

    await this.sessionQueue.add(event.processName, event.data, {
      jobId: event.id,
      removeOnFail: true,
      removeOnComplete: true,
    });
  }
}
