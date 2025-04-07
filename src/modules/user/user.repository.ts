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
    const user = await this.$db.user.findUnique({
      where: { id },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            postId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return this.$db.user.findUnique({
      where: { email },
    });
  }
}
