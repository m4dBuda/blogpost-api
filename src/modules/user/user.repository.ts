import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from 'src/infrastructure/database/database-connection.interface';
import { CreateUserDTO } from './dtos/inputs/create-user.dto';
import { IUserRepository } from './interfaces/user-repository.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async create(data: CreateUserDTO): Promise<UserEntity> {
    return this.$db.user.create({
      data: {
        ...data,
      },
    });
  }

  public async findById(id: string): Promise<UserEntity | null> {
    return this.$db.user.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.$db.user.findUnique({
      where: { email },
    });
  }
}
