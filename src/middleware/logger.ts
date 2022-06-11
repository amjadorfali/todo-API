import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { get as lodashGet, isEmpty as lodashIsEmpty } from 'lodash';
const hidePassword = RegExp(/,?password:\s+((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/, 'gi');
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...varsToLog } = lodashGet(req, 'body.variables', {});
    const query = lodashGet(req, 'body.query', '');

    if (!req.body.operationName && (!lodashIsEmpty(query) || !lodashIsEmpty(varsToLog))) {
      console.log(`Requesting : ${query.replace(hidePassword, 'hiddenPassword')} \n vars ${JSON.stringify(varsToLog)}`);
    }
    next();
  }
}
