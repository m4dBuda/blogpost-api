import { HttpException, Inject, Injectable } from '@nestjs/common';
import { HashHelper } from '../../../common/helpers/hash.helper';
import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { UserCreatedDTO } from '../dtos/outputs/user-created.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserRepository } from '../user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(HashHelper) private readonly hashHelper: HashHelper,
  ) {}

  public async execute(data: CreateUserDTO): Promise<UserCreatedDTO> {
    try {
      const hashedPassword = await this.hashPassword(data.password);
      data.password = hashedPassword;

      const response = await this.userRepository.create(data);
      return new UserCreatedDTO(response);
    } catch (error) {
      throw new HttpException(`Error creating user: ${error.message}`, error.status || 500);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return this.hashHelper.hash(password);
  }
}
