import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ToggleLikePostDTO } from '../dtos/input/toggle-like-post.dto';
import { LikeDTO } from '../dtos/output/like.dto';
import { ILikeRepository } from '../interfaces/like-repository.interface';
import { LikeRepository } from '../like.repository';

@Injectable()
export class ToggleLikeUseCase {
  constructor(@Inject(LikeRepository) private readonly likeRepository: ILikeRepository) {}

  public async execute(data: ToggleLikePostDTO): Promise<LikeDTO> {
    try {
      const existingLike = await this.likeRepository.findLike(data);

      if (existingLike) {
        const removedLike = await this.likeRepository.unlikePost(data);
        return new LikeDTO(removedLike, { action: 'unliked' });
      }

      const newLike = await this.likeRepository.likePost(data);
      return new LikeDTO(newLike, { action: 'liked' });
    } catch (error) {
      throw new HttpException(`Error toggling like: ${error.message}`, error.status || 500);
    }
  }
}
