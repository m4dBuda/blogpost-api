import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../modules/user/user.repository';
import { HttpExceptionFilter } from './exceptions/http-exceptions.filter';
import { AuthGuard } from './guards/auth.guard';
import { HashHelper } from './helpers/hash.helper';
import { JwtHelper } from './helpers/jwt.helper';
import { ResponseInterceptor } from './interceptors/http-response.interceptor';

@Global()
@Module({
  providers: [HashHelper, JwtHelper, JwtService, ResponseInterceptor, HttpExceptionFilter, AuthGuard, UserRepository],
  exports: [HashHelper, JwtHelper, ResponseInterceptor, HttpExceptionFilter, AuthGuard, UserRepository],
})
export class CommonModule {}
