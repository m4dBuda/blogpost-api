import { HttpException } from '@nestjs/common';
import { CreateCommentDTO } from '../../src/modules/comment/dtos/inputs/create-comment.dto';
import { CommentDTO } from '../../src/modules/comment/dtos/outputs/comment.dto';
import { ICommentRepository } from '../../src/modules/comment/interfaces/comment-repository.interface';
import { CreateCommentUseCase } from '../../src/modules/comment/usecases/create-comment.usecase';

describe('CreateCommentUseCase', () => {
  let useCase: CreateCommentUseCase;
  let commentRepository: jest.Mocked<ICommentRepository>;

  beforeEach(() => {
    commentRepository = {
      createComment: jest.fn(),
    } as unknown as jest.Mocked<ICommentRepository>;

    useCase = new CreateCommentUseCase(commentRepository);
  });

  it('should create a comment and return CommentDTO', async () => {
    const mockComment = {
      id: '1',
      content: 'This is a comment',
      authorId: 'user-123',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      post: { id: 'post-1', likes: [{ id: 'like1' }] },
    };

    const mockCreateCommentDTO: CreateCommentDTO = {
      content: 'This is a comment',
      authorId: 'user-123',
      postId: 'post-1',
    };

    commentRepository.createComment.mockResolvedValue(mockComment);

    const result = await useCase.execute(mockCreateCommentDTO);

    expect(result).toBeInstanceOf(CommentDTO);
    expect(result).toEqual(new CommentDTO(mockComment, { likeCount: 1 }));
    expect(commentRepository.createComment).toHaveBeenCalledWith(mockCreateCommentDTO);
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    const mockCreateCommentDTO: CreateCommentDTO = {
      content: 'This is a comment',
      authorId: 'user-123',
      postId: 'post-1',
    };

    commentRepository.createComment.mockRejectedValue(new HttpException('Error creating comment:', 500));

    await expect(useCase.execute(mockCreateCommentDTO)).rejects.toThrow(HttpException);
    expect(commentRepository.createComment).toHaveBeenCalledWith(mockCreateCommentDTO);
  });
});
