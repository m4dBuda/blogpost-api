import { ForbiddenException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { UpdateCommentDTO } from '../dtos/inputs/update-comment.dto';
import { CommentDTO } from '../dtos/outputs/comment.dto';
import { ICommentRepository } from '../interfaces/comment-repository.interface';

@Injectable()
export class UpdateCommentUseCase {
  constructor(@Inject(CommentRepository) private readonly commentRepository: ICommentRepository) {}

  public async execute(id: string, data: UpdateCommentDTO): Promise<CommentDTO> {
    try {
      await this.findCommentAndValidate(id, data.authorId);
      const response = await this.commentRepository.updateComment(id, data);
      const likeCount = response.post?.likes?.length;
      return new CommentDTO(response, { likeCount });
    } catch (error) {
      throw new HttpException(`Error updating comment: ${error.message}`, error.status || 500);
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
