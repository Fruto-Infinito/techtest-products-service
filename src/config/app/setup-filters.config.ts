import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { INestApplication } from '@nestjs/common';

export function setupFilters(app: INestApplication) {
  app.useGlobalFilters(new AllExceptionsFilter());
}
