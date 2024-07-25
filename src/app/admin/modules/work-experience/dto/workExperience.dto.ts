import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getAllWorkExperienceSchema = z.object({
  limit: z
    .string()
    .default('0')
    .optional()
    .transform((value) => Number(value)),
  offset: z
    .string()
    .default('0')
    .optional()
    .transform((value) => Number(value)),
});

export class GetAllWorkWExperienceDTO extends createZodDto(
  getAllWorkExperienceSchema,
) {}

export const createWorkExperienceSchema = z.object({
  time: z.string().trim(),
  company: z.string().trim(),
  position: z.string().trim(),
  _id: z.string().trim().optional(),
  description: z.array(z.string().trim()),
});

export class CreateWorkExperienceDTO extends createZodDto(
  createWorkExperienceSchema,
) {}

export const descriptionSchema = z.object({
  id: z.number().optional(),
  content: z.string().trim(),
});

export const updateWorkExperienceSchema = z.object({
  _id: z.string().trim().optional(),
  time: z.string().trim().optional(),
  company: z.string().trim().optional(),
  position: z.string().trim().optional(),
  description: z.array(descriptionSchema).optional(),
});

export class UpdateWorkExperienceDTO extends createZodDto(
  updateWorkExperienceSchema,
) {}
