// Utilities
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const getAwardsSchema = z.object({
  offset: z
    .string()
    .optional()
    .default('0')
    .transform((value) => Number(value)),
  limit: z
    .string()
    .optional()
    .default('0')
    .transform((value) => Number(value)),
});

export class GetAwardsDTO extends createZodDto(getAwardsSchema) {}

export const createAwardSchema = z.object({
  time: z.string().trim(),
  title: z.string().trim(),
  location: z.string().trim(),
  position: z.string().trim(),
  _id: z.string().trim().optional(),
});

export class CreateAwardDTO extends createZodDto(createAwardSchema) {}

export const updateAwardSchema = z.object({
  _id: z.string().trim().optional(),
  time: z.string().trim().optional(),
  title: z.string().trim().optional(),
  location: z.string().trim().optional(),
  position: z.string().trim().optional(),
});

export class UpdateAwardDTO extends createZodDto(updateAwardSchema) {}
