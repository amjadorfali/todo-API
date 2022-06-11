import { ExceptionFilter, Catch, InternalServerErrorException, UnauthorizedException, HttpException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown): void {
    console.error(JSON.stringify(exception));
    if (exception instanceof HttpException) {
      throw exception;
    }
    if (exception instanceof UnauthorizedException) {
      throw new UnauthorizedException();
    }
    throw new InternalServerErrorException();
  }
}
