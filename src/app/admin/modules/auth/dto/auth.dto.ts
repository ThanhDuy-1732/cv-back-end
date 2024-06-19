import { z } from 'Zod';
import { createZodDto } from 'nestjs-zod';

export const authSignInSchema = z.object({
  userAgent: z.string().trim(),
  username: z.string().max(100).trim(),
  password: z.string().max(100).trim(),
});

export class AuthSignInDTO extends createZodDto(authSignInSchema) {}

export const authGetTokenSchema = z.object({
  userId: z.number().positive(),
  username: z.string().max(100).trim(),
  userAgent: z.string().trim().optional(),
});

export class AuthGetTokenDTO extends createZodDto(authGetTokenSchema) {}

export const authSignOutSchema = z.object({
  userAgent: z.string(),
  userId: z.number().positive(),
});

export class AuthSignOutDTO extends createZodDto(authSignOutSchema) {}
