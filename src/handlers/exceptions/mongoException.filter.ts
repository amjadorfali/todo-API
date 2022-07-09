import { Catch, ConflictException, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { MongoServerError, MongoError } from 'mongodb';
@Catch(MongoError, MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError) {
    console.error(JSON.stringify(exception));
    switch (exception.code) {
      case 11000:
        const displayMessage = getDisplayMessage(exception.keyValue);
        throw new ConflictException({ displayMessage, message: 'DuplicateKeysFound' });
      default:
        throw new InternalServerErrorException();
    }
  }
}

const getDisplayMessage = (keyValue: Record<string, string>) => {
  Object.entries(keyValue).forEach(([key, value]) => console.error(`Key : ${key} with value : ${value} already exists`));
  let displayMessage = '';
  Object.entries(keyValue).forEach(([key, value]) => {
    if (displayMessage) displayMessage += ' & ';
    displayMessage += `${key} ${value}`;
  });
  if (displayMessage) displayMessage += ' already exists';

  return displayMessage;
};
