import { BlogPostEntity } from '../blogpost/blogpost.entity';
import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
  posts?: Partial<BlogPostEntity>[];
  likes?: Partial<LikeEntity>[];
  comments?: Partial<CommentEntity>[];

  constructor(data: UserEntity) {
    this.id = data.id!;
    this.name = data.name!;
    this.email = data.email!;
    this.password = data.password!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
    this.avatar = data.avatar ?? null;
    this.posts = data.posts;
    this.likes = data.likes;
    this.comments = data.comments;
  }
}
