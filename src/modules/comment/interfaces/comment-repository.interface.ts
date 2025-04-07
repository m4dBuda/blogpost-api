import { CommentEntity } from '../comment.entity';
import { CreateCommentDTO } from '../dtos/inputs/create-comment.dto';
import { UpdateCommentDTO } from '../dtos/inputs/update-comment.dto';

export interface ICommentRepository {
  findCommentById(id: string): Promise<CommentEntity | null>;
  createComment(data: CreateCommentDTO): Promise<CommentEntity>;
  updateComment(id: string, data: UpdateCommentDTO): Promise<CommentEntity>;
  deleteComment(id: string): Promise<CommentEntity>;
}
