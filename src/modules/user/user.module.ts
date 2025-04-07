import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, GetUserByIdUseCase, CreateUserUseCase],
  exports: [UserRepository],
})
export class UserModule {}
