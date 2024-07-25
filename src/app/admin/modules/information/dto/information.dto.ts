// Utilities
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Entities
import { InformationTitleEnum } from 'src/app/admin/entities/information.entity';

export const getInformationSchema = z.object({
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

export class GetInformationDTO extends createZodDto(getInformationSchema) {}

export const createInformationSchema = z.object({
  content: z.string().trim(),
  _id: z.string().trim().optional(),
  title: z.nativeEnum(InformationTitleEnum).default(InformationTitleEnum.Other),
});

export class CreateInformationDTO extends createZodDto(
  createInformationSchema,
) {}

export const updateInformationSchema = z.object({
  _id: z.string().trim().optional(),
  content: z.string().trim().optional(),
  title: z
    .nativeEnum(InformationTitleEnum)
    .default(InformationTitleEnum.Other)
    .optional(),
});

export class UpdateInformationDTO extends createZodDto(
  updateInformationSchema,
) {}
