import { BlogPostEntity } from '../blogpost/blogpost.entity';
import { UserEntity } from '../user/user.entity';

export class CommentEntity {
  id: string;
  content: string;
  authorId: string;
  author: UserEntity;
  postId: string;
  post: BlogPostEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    content,
    authorId,
    author,
    postId,
    post,
    createdAt,
    updatedAt,
  }: {
    id: string;
    content: string;
    authorId: string;
    author: UserEntity;
    postId: string;
    post: BlogPostEntity;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.author = author;
    this.postId = postId;
    this.post = post;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
