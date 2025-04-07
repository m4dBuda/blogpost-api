import { LikePostDTO } from '../dtos/input/like-post.dto';
import { UnlikePostDTO } from '../dtos/input/unlike-post.dto';
import { LikeEntity } from '../like.entity';

export interface ILikeRepository {
  findLike(data: LikePostDTO): Promise<LikeEntity | null>;
  likePost(data: LikePostDTO): Promise<LikeEntity>;
  unlikePost(data: UnlikePostDTO): Promise<LikeEntity>;
  getLikesByPostId(postId: string): Promise<LikeEntity[]>;
}
