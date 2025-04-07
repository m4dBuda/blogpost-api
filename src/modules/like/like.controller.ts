import { Controller, Delete, Get, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/dtos/authenticated-request.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LikeDTO } from './dtos/output/like.dto';
import { GetLikesByPostIdUseCase } from './use-cases/get-likes-by-post-id.usecase';
import { LikePostUseCase } from './use-cases/like-post.usecase';
import { UnLikePostUseCase } from './use-cases/unlike-post.usecase';

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
  constructor(
    @Inject(LikePostUseCase) private readonly $like: LikePostUseCase,
    @Inject(UnLikePostUseCase) private readonly $unlike: UnLikePostUseCase,
    @Inject(GetLikesByPostIdUseCase) private readonly $likesByPost: GetLikesByPostIdUseCase,
  ) {}

  @Post(':postId')
  public async likePost(@Param('postId') postId: string, @Request() req: AuthenticatedRequest): Promise<LikeDTO> {
    const userId = req.user.id;
    return this.$like.execute({ postId, userId });
  }

  @Delete(':postId')
  public async unlikePost(@Param('postId') postId: string, @Request() req: AuthenticatedRequest): Promise<LikeDTO> {
    const userId = req.user.id;
    return this.$unlike.execute({ postId, userId });
  }

  @Get(':postId')
  public async getLikesByPostId(@Param('postId') postId: string): Promise<LikeDTO[]> {
    return this.$likesByPost.execute(postId);
  }
}
