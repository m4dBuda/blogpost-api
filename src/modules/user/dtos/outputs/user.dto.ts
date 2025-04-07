import { BlogPostEntity } from 'src/modules/blogpost/blogpost.entity';
import { CommentEntity } from 'src/modules/comment/comment.entity';
import { LikeEntity } from 'src/modules/like/like.entity';
import { UserEntity } from '../../user.entity';

export class UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
  postCount?: number;
  likeCount?: number;
  commentCount?: number;
  posts?: Partial<BlogPostEntity>[];
  likes?: Partial<LikeEntity>[];
  comments?: Partial<CommentEntity>[];

  constructor(user: UserEntity, options?: { postCount?: number; likeCount?: number; commentCount?: number }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.avatar = user.avatar;

    this.postCount = options?.postCount;
    this.likeCount = options?.likeCount;
    this.commentCount = options?.commentCount;

    this.posts = user?.posts ?? undefined;
    this.likes = user?.likes ?? undefined;
    this.comments = user?.comments ?? undefined;
  }
}
