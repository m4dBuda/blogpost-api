import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { UserCreatedDTO } from '../dtos/outputs/user-created.dto';

@Injectable()
export class CreatUserUseCase {
  constructor(@Inject(UserRepository) private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserDTO): Promise<UserCreatedDTO> {
    try {
      const response = await this.userRepository.create(data);
      return new UserCreatedDTO(response);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
