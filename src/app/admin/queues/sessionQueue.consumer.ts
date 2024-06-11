// Utilities
import {
  Process,
  Processor,
  OnQueueActive,
  OnQueueFailed,
  OnQueueCleaned,
  OnQueueRemoved,
  OnQueueResumed,
  OnQueueWaiting,
  OnQueueProgress,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

// Constants
import { QUEUES } from '../constants/queue';

// Services
import { EventService } from '../modules/event/services/event.service';

// Entities
import { Session } from '../entities/session.entity';
import { EventState } from '../entities/event.entity';

@Processor(QUEUES.SESSION)
export class SessionConsumer {
  constructor(private eventService: EventService) {}

  @Process('sessionAdded')
  async handleSessionAddedEvent(job: Job<Session>) {
    console.log('handleSessionAddedEvent', job.data);
  }

  @Process('sessionUpdated')
  async handleSessionUpdatedEvent(job: Job<Session>) {
    console.log('handleSessionUpdatedEvent', job.data);
  }

  @Process('sessionDeleted')
  async handleSessionDeletedEvent(job: Job<Session>) {
    console.log('handleSessionDeletedEvent', job.data);
  }

  @OnQueueWaiting()
  handleWaitingUserQueue(jobId: number) {
    this.eventService.updateStatusEvent({
      id: jobId,
      state: EventState.Waiting,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueActive()
  handleActiveUserQueue(job: Job) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Active,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueProgress()
  handleProgressUserQueue(job: Job) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Progress,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueCompleted()
  handleCompletedUserQueue(job: Job) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Completed,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueFailed()
  handleFailedUserQueue(job: Job, error: Error) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Failed,
      exception: error.message,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueResumed()
  handleResumedUserQueue(job: Job) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Resumed,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueCleaned()
  handleCleanedUserQueue(jobs: Job[]) {
    const ids: number[] = jobs.map((job) => Number(job.id));
    const states: Array<EventState> = Array(jobs.length).fill(
      EventState.Cleaned,
    );
    this.eventService.updateStatusMultiEvent({
      ids,
      states,
      queueName: QUEUES.SESSION,
    });
  }

  @OnQueueRemoved()
  handleRemovedUserQueue(job: Job) {
    this.eventService.updateStatusEvent({
      id: Number(job.id),
      state: EventState.Removed,
      queueName: QUEUES.SESSION,
    });
  }
}
