import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IDatabaseConnection } from 'src/infrastructure/database/database-connection.interface';
import { CreateUserDTO } from './dtos/inputs/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  create(data: CreateUserDTO): Promise<UserEntity> {
    return this.$db.user.create({
      ...data,
    });
  }
}
