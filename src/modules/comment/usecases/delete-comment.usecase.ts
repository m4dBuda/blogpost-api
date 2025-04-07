import { ForbiddenException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { CommentDTO } from '../dtos/outputs/comment.dto';
import { ICommentRepository } from '../interfaces/comment-repository.interface';

@Injectable()
export class DeleteCommentUseCase {
  constructor(@Inject(CommentRepository) private readonly commentRepository: ICommentRepository) {}

  public async execute(id: string, authorId: string): Promise<CommentDTO> {
    await this.findCommentAndValidate(id, authorId);
    try {
      const response = await this.commentRepository.deleteComment(id);
      const likeCount = response.post?.likes?.length;
      return new CommentDTO(response, { likeCount });
    } catch (error) {
      throw new HttpException(`Error deleting comment: ${error.message}`, error.status || 500);
    }
  }

  private async findCommentAndValidate(id: string, authorId: string): Promise<void> {
    const comment = await this.commentRepository.findCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment?.authorId !== authorId) {
      throw new ForbiddenException(`You do not have permission to delete this comment`);
    }
  }
}
