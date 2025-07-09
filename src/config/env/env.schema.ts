import { z } from 'zod';

export const envSchema = z.object({
  // ===============================
  // App
  // ===============================
  PORT: z
    .string()
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: 'PORT debe estar entre 1 y 65535',
    }),

  // ===============================
  // Client CORS Origin
  // ===============================
  CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN es requerido'),

  // ===============================
  // PostgreSQL Database
  // ===============================
  DB_HOST: z.string().min(1, 'DB_HOST es requerido'),
  DB_PORT: z
    .string()
    .transform(Number)
    .refine((port) => port > 0 && port <= 65535, {
      message: 'DB_PORT debe estar entre 1 y 65535',
    }),
  DB_USERNAME: z.string().min(1, 'DB_USERNAME es requerido'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD es requerido'),
  DB_NAME: z.string().min(1, 'DB_NAME es requerido'),
  DB_SYNC: z
    .string()
    .transform((val) => val.trim().toLowerCase() === 'true')
    .default('true'),

  DB_LOGGING: z
    .string()
    .transform((val) => val.trim().toLowerCase() === 'true')
    .default('true'),
});

export type EnvSchema = z.infer<typeof envSchema>;
