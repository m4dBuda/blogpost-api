import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { GetLikesByPostIdUseCase } from './use-cases/get-likes-by-post-id.usecase';
import { ToggleLikeUseCase } from './use-cases/toggle-like.usecase';

@Module({
  controllers: [LikeController],
  providers: [ToggleLikeUseCase, GetLikesByPostIdUseCase, LikeRepository],
})
export class LikeModule {}
