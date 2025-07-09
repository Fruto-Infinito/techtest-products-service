import { INestApplication } from '@nestjs/common';
import { HttpLoggerInterceptor } from '@/common/interceptors/http-logger.interceptor';

export function setupInterceptors(app: INestApplication) {
  app.useGlobalInterceptors(new HttpLoggerInterceptor());
}
