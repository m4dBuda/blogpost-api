import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';
import { UserEntity } from '../user/user.entity';

export class BlogPostEntity {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: Partial<UserEntity> | null;
  comments?: Partial<CommentEntity>[];
  likes?: Partial<LikeEntity>[];

  constructor(data: BlogPostEntity) {
    this.id = data.id!;
    this.title = data.title!;
    this.content = data.content!;
    this.published = data.published!;
    this.authorId = data.authorId!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
    this.author = data.author;
    this.comments = data.comments;
    this.likes = data.likes;
  }
}
