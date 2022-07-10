import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { decrypt } from '../encryption/encryption';

/**
 * @description Not being used, kept for learning purposes
 */
@Injectable()
export class TransformPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (typeof value === 'object') return value;
    console.log('piping all the way');
    return decrypt(value);
  }
}
