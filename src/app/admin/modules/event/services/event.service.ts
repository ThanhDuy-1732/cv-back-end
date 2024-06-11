// Utilities
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// Entities
import { Event } from 'src/app/admin/entities/event.entity';

// Constants
import { UpdateEventDTO, UpdateMultiEventDTO } from '../dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async findEvent(id: number, queueName: string) {
    const event = await this.eventRepository.findOne({
      where: {
        id,
        queueName,
      },
    });

    if (!event) {
      throw new NotFoundException('Event is not exist');
    }

    return event;
  }

  async updateStatusEvent(data: UpdateEventDTO) {
    const event = await this.findEvent(data.id, data.queueName);

    event.state = data.state;

    if (data.exception) {
      event.exception = data.exception;
    }

    await this.eventRepository.save(event);
  }

  async updateStatusMultiEvent(data: UpdateMultiEventDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const index in data.ids) {
        const event = await this.findEvent(data.ids[index], data.queueName);

        event.state = data.states[index];

        if (data?.expectations?.[index]) {
          event.exception = data.expectations[index];
        }

        await queryRunner.manager.save(event);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
