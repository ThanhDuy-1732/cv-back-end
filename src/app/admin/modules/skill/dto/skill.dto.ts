import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const getAllSkillSchema = z.object({
  limit: z
    .string()
    .default('0')
    .transform((value) => Number(value)),
  offset: z
    .string()
    .default('0')
    .transform((value) => Number(value)),
});

export class GetAllSkillDTO extends createZodDto(getAllSkillSchema) {}

export const createSkillSchema = z.object({
  type: z.string().trim(),
  _id: z.string().trim().optional(),
  skills: z.array(z.string().trim()),
});

export class CreateSkillDTO extends createZodDto(createSkillSchema) {}

export const skillSchema = z.object({
  content: z.string().trim(),
  id: z
    .string()
    .optional()
    .transform((value) => Number(value)),
});

export const updateSkillSchema = z.object({
  _id: z.string().trim().optional(),
  type: z.string().trim().optional(),
  skills: z.array(skillSchema).optional(),
});

export class UpdateSkillDTO extends createZodDto(updateSkillSchema) {}
