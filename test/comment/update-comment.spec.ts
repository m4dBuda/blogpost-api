import { ForbiddenException, HttpException, NotFoundException } from '@nestjs/common';
import { UpdateCommentDTO } from '../../src/modules/comment/dtos/inputs/update-comment.dto';
import { CommentDTO } from '../../src/modules/comment/dtos/outputs/comment.dto';
import { ICommentRepository } from '../../src/modules/comment/interfaces/comment-repository.interface';
import { UpdateCommentUseCase } from '../../src/modules/comment/usecases/update-comment.usecase';

describe('UpdateCommentUseCase', () => {
  let useCase: UpdateCommentUseCase;
  let commentRepository: jest.Mocked<ICommentRepository>;

  beforeEach(() => {
    commentRepository = {
      findCommentById: jest.fn(),
      updateComment: jest.fn(),
    } as unknown as jest.Mocked<ICommentRepository>;

    useCase = new UpdateCommentUseCase(commentRepository);
  });

  it('should update a comment and return CommentDTO', async () => {
    const mockComment = {
      id: '1',
      content: 'Updated comment',
      authorId: 'user-123',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      post: { id: 'post-1', likes: [] },
    };

    const mockUpdateCommentDTO: UpdateCommentDTO = {
      content: 'Updated comment',
      authorId: 'user-123',
    };

    commentRepository.findCommentById.mockResolvedValue(mockComment);
    commentRepository.updateComment.mockResolvedValue(mockComment);

    const result = await useCase.execute('1', mockUpdateCommentDTO);

    expect(result).toBeInstanceOf(CommentDTO);
    expect(result).toEqual(new CommentDTO(mockComment, { likeCount: 0 }));
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
    expect(commentRepository.updateComment).toHaveBeenCalledWith('1', mockUpdateCommentDTO);
  });

  it('should throw NotFoundException when the comment is not found', async () => {
    commentRepository.findCommentById.mockResolvedValue(null);

    const mockUpdateCommentDTO: UpdateCommentDTO = {
      content: 'Updated comment',
      authorId: 'user-123',
    };

    await expect(useCase.execute('1', mockUpdateCommentDTO)).rejects.toThrow(NotFoundException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });

  it('should throw ForbiddenException when the user is not the author', async () => {
    const mockComment = {
      id: '1',
      content: 'Original comment',
      authorId: 'user-456',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUpdateCommentDTO: UpdateCommentDTO = {
      content: 'Updated comment',
      authorId: 'user-123',
    };

    commentRepository.findCommentById.mockResolvedValue(mockComment);

    await expect(useCase.execute('1', mockUpdateCommentDTO)).rejects.toThrow(ForbiddenException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    const mockUpdateCommentDTO: UpdateCommentDTO = {
      content: 'Updated comment',
      authorId: 'user-123',
    };

    commentRepository.findCommentById.mockRejectedValue(new HttpException('Error updating comment:', 500));

    await expect(useCase.execute('1', mockUpdateCommentDTO)).rejects.toThrow(HttpException);
    expect(commentRepository.findCommentById).toHaveBeenCalledWith('1');
  });
});
