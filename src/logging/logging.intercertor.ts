// src/logger/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { logger } from './winston.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    const { method, originalUrl, body } = req;

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;

        logger.info({
          message: 'HTTP Request Log',
          method,
          url: originalUrl,
          body,
          statusCode,
          responseTime: `${Date.now() - now}ms`,
        });
      }),
    );
  }
}
