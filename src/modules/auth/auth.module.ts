import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-cases/login.usecase';

@Module({
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
