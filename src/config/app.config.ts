import { INestApplication } from '@nestjs/common';
import { setupPipes } from './app/setup-pipes.config';
import { setupSecurity } from './app/setup-security.config';
import { setupInterceptors } from './app/setup-interceptors.config';
import { setupFilters } from './app/setup-filters.config';
import { setupSwagger } from './app/setup-swagger.config';

export function configureApp(app: INestApplication) {
  setupFilters(app);
  setupInterceptors(app);
  setupPipes(app);
  setupSecurity(app);
  setupSwagger(app);
}
