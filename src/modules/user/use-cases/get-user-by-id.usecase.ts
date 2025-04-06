import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  }
}
