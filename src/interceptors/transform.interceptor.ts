import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { decrypt, encrypt } from 'src/handlers/encryption/encryption';

export interface Response<T> {
  data: T;
}

/**
 * @description Not Being used, kept for learning purposes
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Promise<any>> {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = GqlExecutionContext.create(context);

    const encrypted = ctx.getArgs();
    // const decrypted = await decrypt(encrypted);
    // console.log('decrypted  : \n', encrypted);
    // console.log('decrypted  : \n', decrypted);
    // console.log(ctx.getContext().res);
    return next.handle();

    // .pipe(
    //   map(async (v) => {
    //     // await encrypt(v);
    //     // console.log('transformed');
    //     const res = ctx.getContext().res;
    //     // res.send({ data: (await encrypt(v)).toString('base64') });
    //     console.log('sent response');
    //     res.send({ data: 'kessa la emmak' });
    //     // return { data: (await encrypt(v)).toString('base64') };
    //     // return { accessToken: (await encrypt(v)).toString('base64') };
    //     // return await encrypt(v);
    //   }),
    // );
  }
}
