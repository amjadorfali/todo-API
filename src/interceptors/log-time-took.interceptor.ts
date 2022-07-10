import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogTimeTookInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    console.log('Request Started at : ', now);

    return next.handle().pipe(
      tap(() =>
        console.log(`Request ended at ${new Date()},
     \n Time took : ${(Date.now() - now.getTime()) / 1000}s`),
      ),
    );
  }
}
