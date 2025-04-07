import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from 'src/infrastructure/database/database-connection.interface';
import { LikePostDTO } from './dtos/input/like-post.dto';
import { ILikeRepository } from './interfaces/like-repository.interface';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository implements ILikeRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async findLike(data: LikePostDTO): Promise<LikeEntity | null> {
    return this.$db.like.findUnique({
      where: {
        unique_post_user_like: {
          postId: data.postId,
          userId: data.userId,
        },
      },
    });
  }

  public async likePost(data: LikePostDTO): Promise<LikeEntity> {
    return this.$db.like.create({
      data: {
        userId: data.userId,
        postId: data.postId,
      },
    });
  }

  public async unlikePost(data: LikePostDTO): Promise<LikeEntity> {
    return this.$db.like.delete({
      where: {
        unique_post_user_like: {
          postId: data.postId,
          userId: data.userId,
        },
      },
    });
  }

  public async getLikesByPostId(postId: string): Promise<LikeEntity[]> {
    return this.$db.like.findMany({
      where: {
        postId,
      },
    });
  }
}
