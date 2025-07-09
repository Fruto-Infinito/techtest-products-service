import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { Request, Response } from 'express';
import {
  getMethodColor,
  getStatusColor,
  formatDuration,
  grayLabel,
  formatBytes,
} from '../utils/logger.utils';
import chalk from 'chalk';

declare module 'express' {
  export interface Request {
    contextInfo?: {
      module: string;
      controller: string;
      handler: string;
    };
  }
}

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

    let totalBytes = 0;

    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);

    res.write = (chunk: any, ...args: any[]): boolean => {
      if (chunk && (typeof chunk === 'string' || Buffer.isBuffer(chunk))) {
        totalBytes += Buffer.byteLength(chunk);
      }
      return originalWrite(chunk, ...args);
    };

    res.end = (chunk: any, ...args: any[]): any => {
      if (chunk && (typeof chunk === 'string' || Buffer.isBuffer(chunk))) {
        totalBytes += Buffer.byteLength(chunk);
      }
      return originalEnd(chunk, ...args);
    };

    return next.handle().pipe(
      map((data) => {
        try {
          const json = JSON.stringify(data);
          totalBytes += Buffer.byteLength(json);
        } catch {
          // ignorar error de serialización
        }
        return data;
      }),

      tap(() => {
        const duration = Date.now() - now;
        const { method, originalUrl } = req;
        const statusCode = res.statusCode;

        const coloredMethod = getMethodColor(method);
        const coloredUrl = chalk.white(originalUrl);
        const coloredStatus = getStatusColor(statusCode);
        const coloredTime = formatDuration(duration);
        const coloredSize = chalk.cyan(formatBytes(totalBytes));
        const contextLabel = grayLabel(`[${module}.${controller}.${handler}]`);

        this.logger.log(
          `${contextLabel} ${coloredMethod} ${coloredUrl} ${coloredStatus} - ${coloredTime} - ${coloredSize}`,
        );
      }),
    );
  }
}
