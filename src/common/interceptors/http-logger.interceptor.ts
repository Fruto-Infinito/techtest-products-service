import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

declare module 'express' {
  export interface Request {
    contextInfo?: {
      module: string;
      controller: string;
      handler: string;
    };
  }
}
import {
  getMethodColor,
  getStatusColor,
  formatDuration,
  grayLabel,
} from '../utils/logger.utils';
import chalk from 'chalk';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const module = controller.replace('Controller', 'Module');

    req.contextInfo = {
      module,
      controller,
      handler,
    };

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;

        const coloredMethod = getMethodColor(method);
        const coloredUrl = chalk.white(originalUrl);
        const coloredStatus = getStatusColor(statusCode);
        const coloredTime = formatDuration(duration);
        const contextLabel = grayLabel(`[${module}.${controller}.${handler}]`);

        this.logger.log(
          `${contextLabel} ${coloredMethod} ${coloredUrl} ${coloredStatus} - ${coloredTime}`,
        );
      }),
    );
  }
}
