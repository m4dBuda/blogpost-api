import { BlogPostEntity } from '../blogpost/blogpost.entity';
import { UserEntity } from '../user/user.entity';

export class CommentEntity {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: Partial<UserEntity>;
  post?: Partial<BlogPostEntity>;

  constructor(data: CommentEntity) {
    this.id = data.id!;
    this.content = data.content!;
    this.authorId = data.authorId!;
    this.postId = data.postId!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
    this.author = data.author;
    this.post = data.post;
  }
}
