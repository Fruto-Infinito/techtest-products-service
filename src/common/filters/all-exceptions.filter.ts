import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import chalk from 'chalk';
import {
  getMethodColor,
  getStatusColor,
  grayLabel,
} from '../utils/logger.utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Unhandled Exception: ${exception instanceof Error ? exception.message : exception}`,
      );
      if (exception instanceof Error && exception.stack) {
        this.logger.error(exception.stack);
      }
    }

    const message =
      typeof rawResponse === 'string'
        ? rawResponse
        : this.extractMessage(rawResponse);

    const coloredMethod = getMethodColor(request.method);
    const coloredUrl = chalk.white(request.url);
    const coloredStatus = getStatusColor(status);
    const contextLabel = grayLabel('[ExceptionFilter]');

    const contextInfo = request.contextInfo
      ? `${request.contextInfo.module}.${request.contextInfo.controller}.${request.contextInfo.handler}`
      : '';

    this.logger.error(
      `${contextLabel} ${contextInfo} ${coloredMethod} ${coloredUrl} ${coloredStatus} - ${
        typeof message === 'string'
          ? message
          : 'Validation error:\n' + JSON.stringify(message, null, 2)
      }`,
    );

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : 'Validation error',
      errors: typeof message === 'object' ? message : undefined,
    });
  }

  private extractMessage(response): string | Record<string, string[]> {
    if (Array.isArray(response?.message) && response.message[0]?.property) {
      const fieldErrors: Record<string, string[]> = {};

      const flatten = (error: ValidationError) => {
        if (error.constraints) {
          fieldErrors[error.property] = Object.values(error.constraints);
        }
        if (error.children?.length) {
          error.children.forEach(flatten);
        }
      };

      response.message.forEach(flatten);
      return fieldErrors;
    }

    if (typeof response?.message === 'string') return response.message;
    if (typeof response?.error === 'string') return response.error;

    return 'Unexpected error';
  }
}
