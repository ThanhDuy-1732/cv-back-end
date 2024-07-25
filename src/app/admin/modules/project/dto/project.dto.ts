import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getAllProjectSchema = z.object({
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

export class GetAllProjectDTO extends createZodDto(getAllProjectSchema) {}

export const createProjectSchema = z.object({
  time: z.string().trim(),
  name: z.string().trim(),
  position: z.string().trim(),
  description: z.string().trim(),
  url: z.array(z.string().trim()),
  _id: z.string().trim().optional(),
  company: z.string().trim().optional(),
  numberOfMember: z.number().positive(),
  mainTechs: z.array(z.string().trim()),
  technologyInUse: z.array(z.string().trim()),
  responsibilitiesAndAchievement: z.array(z.string().trim()),
});

export class CreateProjectDTO extends createZodDto(createProjectSchema) {}

export const contentSchema = z.object({
  content: z.string().trim(),
  id: z.number().positive().optional(),
});

export const updateProjectSchema = z.object({
  _id: z.string().trim().optional(),
  time: z.string().trim().optional(),
  name: z.string().trim().optional(),
  company: z.string().trim().optional(),
  position: z.string().trim().optional(),
  url: z.array(contentSchema).optional(),
  description: z.string().trim().optional(),
  mainTechs: z.array(contentSchema).optional(),
  numberOfMember: z.number().positive().optional(),
  technologyInUse: z.array(contentSchema).optional(),
  responsibilitiesAndAchievement: z.array(contentSchema).optional(),
});

export class UpdateProjectDTO extends createZodDto(updateProjectSchema) {}
