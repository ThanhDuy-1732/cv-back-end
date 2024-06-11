// Utilities
import { z } from 'zod';

// Data Transfer Objects
import { createZodDto } from 'nestjs-zod';

// Constants
import { QUEUES } from 'src/app/admin/constants/queue';

// Entities
import { EventState } from 'src/app/admin/entities/event.entity';

export const updateEventSchema = z.object({
  id: z.number().positive(),

  queueName: z.nativeEnum(QUEUES),

  state: z.nativeEnum(EventState),

  exception: z.string().optional(),
});

export class UpdateEventDTO extends createZodDto(updateEventSchema) {}

export const updateMultiEventSchema = z.object({
  ids: z.array(z.number()),

  queueName: z.nativeEnum(QUEUES),

  states: z.array(z.nativeEnum(EventState)),

  expectations: z.array(z.string()).optional(),
});

export class UpdateMultiEventDTO extends createZodDto(updateMultiEventSchema) {}
