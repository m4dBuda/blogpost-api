import { HttpException, Inject, Injectable } from '@nestjs/common';
import { LikeDTO } from '../dtos/output/like.dto';
import { ILikeRepository } from '../interfaces/like-repository.interface';
import { LikeRepository } from '../like.repository';

@Injectable()
export class GetLikesByPostIdUseCase {
  constructor(@Inject(LikeRepository) private readonly likeRepository: ILikeRepository) {}

  public async execute(postId: string): Promise<LikeDTO[]> {
    try {
      const likes = await this.likeRepository.getLikesByPostId(postId);
      if (!likes || likes.length === 0) {
        return [];
      }

      const likeCount = likes.length;
      return likes.map((like) => new LikeDTO(like, { likeCount, post: like.post }));
    } catch (error) {
      throw new HttpException(`Error fetching likes by post ID: ${error.message}`, error.status || 500);
    }
  }
}
