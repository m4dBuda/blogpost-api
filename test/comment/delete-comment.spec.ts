import { ForbiddenException, HttpException, NotFoundException } from '@nestjs/common';
import { CommentDTO } from '../../src/modules/comment/dtos/outputs/comment.dto';
import { ICommentRepository } from '../../src/modules/comment/interfaces/comment-repository.interface';
import { DeleteCommentUseCase } from '../../src/modules/comment/usecases/delete-comment.usecase';

describe('DeleteCommentUseCase', () => {
  let useCase: DeleteCommentUseCase;
  let commentRepository: jest.Mocked<ICommentRepository>;

  beforeEach(() => {
    commentRepository = {
      findCommentById: jest.fn(),
      deleteComment: jest.fn(),
    } as unknown as jest.Mocked<ICommentRepository>;

    useCase = new DeleteCommentUseCase(commentRepository);
  });

  it('should delete a comment and return CommentDTO', async () => {
    const mockComment = {
      id: '1',
      content: 'This is a comment',
      authorId: 'user-123',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      post: { id: 'post-1', likes: [] },
    };

    commentRepository.findCommentById.mockResolvedValue(mockComment);
    commentRepository.deleteComment.mockResolvedValue(mockComment);

    const result = await useCase.execute('1', 'user-123');

    expect(result).toBeInstanceOf(CommentDTO);
    expect(result).toEqual(new CommentDTO(mockComment, { likeCount: 0 }));
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
    expect(commentRepository.deleteComment).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when the comment is not found', async () => {
    commentRepository.findCommentById.mockResolvedValue(null);

    await expect(useCase.execute('1', 'user-123')).rejects.toThrow(NotFoundException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });

  it('should throw ForbiddenException when the user is not the author', async () => {
    const mockComment = {
      id: '1',
      content: 'This is a comment',
      authorId: 'user-456',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    commentRepository.findCommentById.mockResolvedValue(mockComment);

    await expect(useCase.execute('1', 'user-123')).rejects.toThrow(ForbiddenException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    commentRepository.findCommentById.mockRejectedValue(
      new HttpException('You do not have permission to delete this comment', 500),
    );

    await expect(useCase.execute('1', 'user-123')).rejects.toThrow(HttpException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });
});
