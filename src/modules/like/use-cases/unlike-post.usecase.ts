import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UnlikePostDTO } from '../dtos/input/unlike-post.dto';
import { LikeDTO } from '../dtos/output/like.dto';
import { ILikeRepository } from '../interfaces/like-repository.interface';
import { LikeRepository } from '../like.repository';

@Injectable()
export class UnLikePostUseCase {
  constructor(@Inject(LikeRepository) private readonly likeRepository: ILikeRepository) {}

  public async execute(data: UnlikePostDTO): Promise<LikeDTO> {
    try {
      const existingLike = await this.likeRepository.findLike(data);
      if (!existingLike) {
        throw new NotFoundException(`Like not found for userId: ${data.userId} and postId: ${data.postId}`);
      }

      const response = await this.likeRepository.unlikePost(data);
      return new LikeDTO(response);
    } catch (error) {
      throw new InternalServerErrorException(`Error removing like: ${error.message}`);
    }
  }
}
