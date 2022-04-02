import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DefinitionNode, parse } from 'graphql';
import lodash from 'lodash';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body.operationName && !RegExp('password', 'i').test(req.body.query)) {
      console.log(`Requesting : ${req.body.query} \n vars ${JSON.stringify(req.body.variables)}`);
    }
    next();
  }
}
