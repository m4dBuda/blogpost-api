import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from '../../infrastructure/database/database-connection.interface';
import { ToggleLikePostDTO } from './dtos/input/toggle-like-post.dto';
import { ILikeRepository } from './interfaces/like-repository.interface';
import { LikeEntity } from './like.entity';

@Injectable()
export class LikeRepository implements ILikeRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async findLike(data: ToggleLikePostDTO): Promise<LikeEntity | null> {
    return this.$db.like.findUnique({
      where: {
        unique_post_user_like: {
          postId: data.postId,
          userId: data.userId,
        },
      },
    });
  }

  public async likePost(data: ToggleLikePostDTO): Promise<LikeEntity> {
    return this.$db.like.create({
      data: {
        userId: data.userId,
        postId: data.postId,
      },
    });
  }

  public async unlikePost(data: ToggleLikePostDTO): Promise<LikeEntity> {
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
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
