// Utilities
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const getEducationSchema = z.object({
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

export class GetEducationDTO extends createZodDto(getEducationSchema) {}

export const createEducationSchema = z.object({
  time: z.string().trim(),
  title: z.string().trim(),
  score: z.string().trim(),
  _id: z.string().trim().optional(),
  location: z.string().trim().optional().default(''),
  subInfo: z.array(
    z.object({
      content: z.string().trim(),
    }),
  ),
});

export class CreateEducationDTO extends createZodDto(createEducationSchema) {}

export const updateEducationSchema = z.object({
  _id: z.string().trim().optional(),
  time: z.string().trim().optional(),
  title: z.string().trim().optional(),
  score: z.string().trim().optional(),
  location: z.string().trim().optional().default(''),
  subInfo: z.array(
    z.object({
      id: z
        .string()
        .optional()
        .transform((value) => Number(value)),
      content: z.string().trim(),
    }),
  ),
});

export class UpdateEducationDTO extends createZodDto(updateEducationSchema) {}

export const updateSubInfoSchema = z.object({
  id: z
    .string()
    .optional()
    .transform((value) => Number(value)),
  content: z.string().trim(),
});

export class UpdateSubInfoDTO extends createZodDto(updateSubInfoSchema) {}
