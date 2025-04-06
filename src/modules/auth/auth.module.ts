import { Module } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-cases/login.usecase';

@Module({
  controllers: [AuthController],
  providers: [LoginUseCase, UserRepository],
})
export class AuthModule {}
