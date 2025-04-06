import { BlogPostEntity } from '../blogpost/blogpost.entity';
import { UserEntity } from '../user/user.entity';

export class LikeEntity {
  id: string;
  postId: string;
  post: BlogPostEntity;
  userId: string;
  user: UserEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    postId,
    post,
    userId,
    user,
    createdAt,
    updatedAt,
  }: {
    id: string;
    postId: string;
    post: BlogPostEntity;
    userId: string;
    user: UserEntity;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.postId = postId;
    this.post = post;
    this.userId = userId;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
