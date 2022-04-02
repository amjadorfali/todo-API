import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoServerError } from 'mongodb';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: MongoServerError, host: ArgumentsHost): void {
    console.error(JSON.stringify(exception));
    throw new InternalServerErrorException();
  }
}
