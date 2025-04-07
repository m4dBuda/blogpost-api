import { BlogPostEntity } from '../../../blogpost/blogpost.entity';
import { UserEntity } from '../../../user/user.entity';
import { LikeEntity } from '../../like.entity';

export class LikeDTO {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;

  likeCount?: number;
  user?: Partial<UserEntity>;
  post?: Partial<BlogPostEntity>;
  action?: 'liked' | 'unliked';

  constructor(
    data: LikeEntity,
    options?: {
      action?: 'liked' | 'unliked';
      likeCount?: number;
      user?: Partial<UserEntity>;
      post?: Partial<BlogPostEntity>;
    },
  ) {
    this.id = data.id;
    this.userId = data.userId;
    this.postId = data.postId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    this.action = options?.action;
    this.likeCount = options?.likeCount;
    this.user = options?.user;
    this.post = options?.post;
  }
}
