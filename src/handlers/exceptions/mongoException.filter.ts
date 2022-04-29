import { Catch, ConflictException, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { MongoError, MongoServerError } from 'mongoose/node_modules/mongodb';

@Catch(MongoError, MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError) {
    switch (exception.code) {
      case 11000:
        Object.entries(exception.keyValue).forEach(([key, value]) => console.error(`Key : ${key} with value : ${value} already exists`));
        throw new ConflictException(JSON.stringify(exception.keyValue), 'DuplicateKeysFound');
      default:
        console.error(JSON.stringify(exception));
        throw new InternalServerErrorException();
    }
  }
}
