import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { GetLikesByPostIdUseCase } from './use-cases/get-likes-by-post-id.usecase';
import { LikePostUseCase } from './use-cases/like-post.usecase';
import { UnLikePostUseCase } from './use-cases/unlike-post.usecase';

@Module({
  controllers: [LikeController],
  providers: [LikePostUseCase, UnLikePostUseCase, GetLikesByPostIdUseCase, LikeRepository],
})
export class LikeModule {}
