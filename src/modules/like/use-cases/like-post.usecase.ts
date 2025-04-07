import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LikePostDTO } from '../dtos/input/like-post.dto';
import { LikeDTO } from '../dtos/output/like.dto';
import { ILikeRepository } from '../interfaces/like-repository.interface';
import { LikeRepository } from '../like.repository';

@Injectable()
export class LikePostUseCase {
  constructor(@Inject(LikeRepository) private readonly likeRepository: ILikeRepository) {}

  public async execute(data: LikePostDTO): Promise<LikeDTO> {
    try {
      const response = await this.likeRepository.likePost(data);
      return new LikeDTO(response);
    } catch (error) {
      throw new InternalServerErrorException(`Error creating like: ${error.message}`);
    }
  }
}
