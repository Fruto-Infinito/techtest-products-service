import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './common/logger';
import { createLogger } from './config/app/setup-logger.config';
import { configureApp } from './config/app.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: createLogger(),
    });

    configureApp(app);
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 4000);
    await app.listen(port);

    logger.info(`Application started successfully at http://localhost:${port}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error('Application failed to start', {
        message: error.message,
        stack: error.stack,
      });
    } else {
      logger.error('Application failed to start', { error });
    }
    process.exit(1);
  }
  process.on('SIGINT', () => {
    logger.warn('Received SIGINT. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logger.warn('Received SIGTERM. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection at Promise', { reason });
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown', { error });
    process.exit(1);
  });
}
void bootstrap();
