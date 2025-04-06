import { Global, Module } from '@nestjs/common';
import { HashHelper } from './helpers/hash.helper';
import { JwtHelper } from './helpers/jwt.helper';
import { ResponseInterceptor } from './interceptors/http-response.interceptor';
import { HttpExceptionFilter } from './exceptions/http-exceptions.filter';

@Global()
@Module({
  providers: [
    HashHelper,
    JwtHelper,
    ResponseInterceptor,
    HttpExceptionFilter,
  ],
  exports: [
    HashHelper,
    JwtHelper,
    ResponseInterceptor,
    HttpExceptionFilter,
  ],
})
export class CommonModule {}