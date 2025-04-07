import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO } from '../dtos/outputs/user.dto';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<UserDTO> {
    const response = await this.userRepository.findById(id);

    if (!response) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      const postCount = response.posts?.length || 0;
      const likeCount = response.likes?.length || 0;
      const commentCount = response.comments?.length || 0;

      return new UserDTO(response, {
        postCount,
        likeCount,
        commentCount,
      });
    } catch (error) {
      throw new HttpException(`Error retrieving user: ${error.message}`, error.status || 500);
    }
  }
}
