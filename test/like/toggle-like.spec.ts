import { HttpException } from '@nestjs/common';
import { ToggleLikePostDTO } from '../../src/modules/like/dtos/input/toggle-like-post.dto';
import { LikeDTO } from '../../src/modules/like/dtos/output/like.dto';
import { ILikeRepository } from '../../src/modules/like/interfaces/like-repository.interface';
import { ToggleLikeUseCase } from '../../src/modules/like/use-cases/toggle-like.usecase';

describe('ToggleLikeUseCase', () => {
  let useCase: ToggleLikeUseCase;
  let likeRepository: jest.Mocked<ILikeRepository>;

  beforeEach(() => {
    likeRepository = {
      findLike: jest.fn(),
      unlikePost: jest.fn(),
      likePost: jest.fn(),
    } as unknown as jest.Mocked<ILikeRepository>;

    useCase = new ToggleLikeUseCase(likeRepository);
  });

  it('should like a post and return LikeDTO', async () => {
    const mockLike = {
      id: '1',
      userId: 'user-123',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToggleLikePostDTO: ToggleLikePostDTO = {
      userId: 'user-123',
      postId: 'post-1',
    };

    likeRepository.findLike.mockResolvedValue(null);
    likeRepository.likePost.mockResolvedValue(mockLike);

    const result = await useCase.execute(mockToggleLikePostDTO);

    expect(result).toBeInstanceOf(LikeDTO);
    expect(result).toEqual(new LikeDTO(mockLike, { action: 'liked' }));
    expect(likeRepository.findLike).toHaveBeenCalledWith(mockToggleLikePostDTO);
    expect(likeRepository.likePost).toHaveBeenCalledWith(mockToggleLikePostDTO);
  });

  it('should unlike a post and return LikeDTO', async () => {
    const mockLike = {
      id: '1',
      userId: 'user-123',
      postId: 'post-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockToggleLikePostDTO: ToggleLikePostDTO = {
      userId: 'user-123',
      postId: 'post-1',
    };

    likeRepository.findLike.mockResolvedValue(mockLike);
    likeRepository.unlikePost.mockResolvedValue(mockLike);

    const result = await useCase.execute(mockToggleLikePostDTO);

    expect(result).toBeInstanceOf(LikeDTO);
    expect(result).toEqual(new LikeDTO(mockLike, { action: 'unliked' }));
    expect(likeRepository.findLike).toHaveBeenCalledWith(mockToggleLikePostDTO);
    expect(likeRepository.unlikePost).toHaveBeenCalledWith(mockToggleLikePostDTO);
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    const mockToggleLikePostDTO: ToggleLikePostDTO = {
      userId: 'user-123',
      postId: 'post-1',
    };

    likeRepository.findLike.mockRejectedValue(new HttpException('Error toggling like', 500));

    await expect(useCase.execute(mockToggleLikePostDTO)).rejects.toThrow(HttpException);
    expect(likeRepository.findLike).toHaveBeenCalledWith(mockToggleLikePostDTO);
  });
});
