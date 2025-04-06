import { CommentEntity } from '../comment/comment.entity';
import { LikeEntity } from '../like/like.entity';
import { UserEntity } from '../user/user.entity';

export class BlogPostEntity {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
  author?: UserEntity;
  comments?: CommentEntity[];
  likes?: LikeEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    content,
    published,
    authorId,
    author,
    comments,
    likes,
    createdAt,
    updatedAt,
  }: {
    id: string;
    title: string;
    content?: string;
    published: boolean;
    authorId: string;
    author?: UserEntity;
    comments?: CommentEntity[];
    likes?: LikeEntity[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.published = published;
    this.authorId = authorId;
    this.author = author;
    this.comments = comments;
    this.likes = likes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
