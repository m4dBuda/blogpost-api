import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from '../comment.repository';
import { CreateCommentDTO } from '../dtos/inputs/create-comment.dto';
import { CommentDTO } from '../dtos/outputs/comment.dto';
import { ICommentRepository } from '../interfaces/comment-repository.interface';

@Injectable()
export class CreateCommentUseCase {
  constructor(@Inject(CommentRepository) private readonly commentRepository: ICommentRepository) {}

  public async execute(data: CreateCommentDTO): Promise<CommentDTO> {
    try {
      const response = await this.commentRepository.createComment(data);
      const likeCount = response.post?.likes?.length;
      return new CommentDTO(response, { likeCount });
    } catch (error) {
      throw new HttpException(`Error creating comment: ${error.message}`, error.status || 500);
    }
  }
}
