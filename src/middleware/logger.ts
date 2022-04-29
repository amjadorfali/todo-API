import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.operationName && !RegExp('password', 'i').test(req.body.query)) {
      console.log(`Requesting : ${req.body.query} \n vars ${JSON.stringify(req.body.variables)}`);
    }
    next();
  }
}
