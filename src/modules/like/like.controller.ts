import { Controller, Get, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../common/dtos/authenticated-request.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { LikeDTO } from './dtos/output/like.dto';
import { GetLikesByPostIdUseCase } from './use-cases/get-likes-by-post-id.usecase';
import { ToggleLikeUseCase } from './use-cases/toggle-like.usecase';

@UseGuards(AuthGuard)
@Controller('like')
export class LikeController {
  constructor(
    @Inject(ToggleLikeUseCase) private readonly $like: ToggleLikeUseCase,
    @Inject(GetLikesByPostIdUseCase) private readonly $likesByPost: GetLikesByPostIdUseCase,
  ) {}

  @Post(':postId')
  public async likePost(@Param('postId') postId: string, @Request() req: AuthenticatedRequest): Promise<LikeDTO> {
    const userId = req.user.id;
    return this.$like.execute({ postId, userId });
  }

  @Get(':postId')
  public async getLikesByPostId(@Param('postId') postId: string): Promise<LikeDTO[]> {
    return this.$likesByPost.execute(postId);
  }
}
