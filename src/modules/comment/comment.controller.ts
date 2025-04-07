import { Body, Controller, Delete, Inject, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../common/dtos/authenticated-request.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CreateCommentDTO } from './dtos/inputs/create-comment.dto';
import { UpdateCommentDTO } from './dtos/inputs/update-comment.dto';
import { CommentDTO } from './dtos/outputs/comment.dto';
import { CreateCommentUseCase } from './usecases/create-comment.usecase';
import { DeleteCommentUseCase } from './usecases/delete-comment.usecase';
import { UpdateCommentUseCase } from './usecases/update-comment.usecase';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
  constructor(
    @Inject(CreateCommentUseCase) private readonly $create: CreateCommentUseCase,
    @Inject(UpdateCommentUseCase) private readonly $update: UpdateCommentUseCase,
    @Inject(DeleteCommentUseCase) private readonly $delete: DeleteCommentUseCase,
  ) {}

  @Post()
  public async createComment(
    @Body() data: CreateCommentDTO,
    @Request() req: AuthenticatedRequest,
  ): Promise<CommentDTO> {
    data.authorId = req.user.id;
    return this.$create.execute(data);
  }

  @Put(':id')
  public async updateComment(
    @Param('id') id: string,
    @Body() data: UpdateCommentDTO,
    @Request() req: AuthenticatedRequest,
  ): Promise<CommentDTO> {
    data.authorId = req.user.id;
    return this.$update.execute(id, data);
  }

  @Delete(':id')
  public async deleteComment(@Param('id') id: string, @Request() req: AuthenticatedRequest): Promise<CommentDTO> {
    const authorId = req.user.id;
    return this.$delete.execute(id, authorId);
  }
}
