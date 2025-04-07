import { LikeEntity } from '../../like.entity';

export class LikeDTO {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: LikeEntity) {
    this.id = data.id;
    this.userId = data.userId;
    this.postId = data.postId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
