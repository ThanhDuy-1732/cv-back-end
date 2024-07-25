import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getOverviewSchema = z.object({
  limit: z
    .string()
    .optional()
    .default('0')
    .transform((value) => Number(value)),
  offset: z
    .string()
    .optional()
    .default('0')
    .transform((value) => Number(value)),
});

export class GetOverviewDTO extends createZodDto(getOverviewSchema) {}

export const createOverviewSchema = z.object({
  value: z.string().trim(),
  _id: z.string().trim().optional(),
});

export class CreateOverviewDTO extends createZodDto(createOverviewSchema) {}

export const updateOverviewSchema = z.object({
  _id: z.string().trim().optional(),
  value: z.string().trim().optional(),
});

export class UpdateOverviewDTO extends createZodDto(updateOverviewSchema) {}
