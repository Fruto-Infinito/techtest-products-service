import { logger } from '@/common/logger';
import { envSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    logger.error('Error en variables de entorno:');
    logger.error(parsed.error.format());
    throw new Error('Configuración de entorno inválida');
  }

  return parsed.data;
}
