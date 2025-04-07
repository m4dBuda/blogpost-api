import { BlogPostEntity } from 'src/modules/blogpost/blogpost.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { CommentEntity } from '../../comment.entity';

export class CommentDTO {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  likeCount: number;
  post?: Partial<BlogPostEntity>;
  author?: Partial<UserEntity>;

  constructor(data: CommentEntity, options?: { likeCount?: number }) {
    this.id = data.id;
    this.postId = data.postId;
    this.authorId = data.authorId;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    this.likeCount = options?.likeCount ?? 0;
    this.post = data.post ?? undefined;
    this.author = data.author ?? undefined;
  }
}
