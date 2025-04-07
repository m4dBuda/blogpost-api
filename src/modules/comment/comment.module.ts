import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CreateCommentUseCase } from './usecases/create-comment.usecase';
import { DeleteCommentUseCase } from './usecases/delete-comment.usecase';
import { UpdateCommentUseCase } from './usecases/update-comment.usecase';

@Module({
  controllers: [CommentController],
  providers: [CreateCommentUseCase, DeleteCommentUseCase, UpdateCommentUseCase, CommentRepository],
})
export class CommentModule {}
