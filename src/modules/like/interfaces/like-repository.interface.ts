import { ToggleLikePostDTO } from '../dtos/input/toggle-like-post.dto';
import { LikeEntity } from '../like.entity';

export interface ILikeRepository {
  findLike(data: ToggleLikePostDTO): Promise<LikeEntity | null>;
  likePost(data: ToggleLikePostDTO): Promise<LikeEntity>;
  unlikePost(data: ToggleLikePostDTO): Promise<LikeEntity>;
  getLikesByPostId(postId: string): Promise<LikeEntity[]>;
}
