import { CommentEntity } from 'src/modules/comment/comment.entity';
import { LikeEntity } from 'src/modules/like/like.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { BlogPostEntity } from '../../blogpost.entity';

export class BlogPostDTO {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  likeCount?: number;
  commentCount?: number;
  author?: Partial<UserEntity>;
  comments?: Partial<CommentEntity>[];
  likes?: Partial<LikeEntity>[];

  constructor(data: BlogPostEntity, options?: Partial<BlogPostDTO>) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.published = data.published;
    this.authorId = data.authorId;

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    this.likeCount = options?.likeCount;
    this.commentCount = options?.commentCount;

    this.author = data.author ?? undefined;
    this.likes = data.likes ?? undefined;
    this.comments = data.comments ?? undefined;
  }
}
