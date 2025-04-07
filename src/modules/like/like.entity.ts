import { BlogPostEntity } from '../blogpost/blogpost.entity';
import { UserEntity } from '../user/user.entity';

export class LikeEntity {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: Partial<UserEntity>;
  post?: Partial<BlogPostEntity>;

  constructor(data: LikeEntity) {
    this.id = data.id!;
    this.postId = data.postId!;
    this.userId = data.userId!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
    this.post = data.post;
    this.user = data.user;
  }
}
