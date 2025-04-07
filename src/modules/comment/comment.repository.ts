import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from '../../infrastructure/database/database-connection.interface';
import { CommentEntity } from './comment.entity';
import { ICommentRepository } from './interfaces/comment-repository.interface';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async findCommentById(id: string): Promise<CommentEntity | null> {
    return this.$db.comment.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  public async createComment(data: any): Promise<CommentEntity> {
    return await this.$db.comment.create({
      data,
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  public async updateComment(id: string, data: any): Promise<CommentEntity> {
    return this.$db.comment.update({
      where: { id },
      data,
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  public async deleteComment(id: string): Promise<CommentEntity> {
    return this.$db.comment.delete({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            likes: true,
            comments: true,
          },
        },
      },
    });
  }
}
