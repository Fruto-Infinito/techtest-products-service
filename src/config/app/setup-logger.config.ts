import { WinstonModule } from 'nest-winston';
import { logger } from '@/common/logger';

export function createLogger() {
  return WinstonModule.createLogger({
    instance: logger,
  });
}
