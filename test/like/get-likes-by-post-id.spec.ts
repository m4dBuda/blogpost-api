import { HttpException } from '@nestjs/common';
import { LikeDTO } from '../../src/modules/like/dtos/output/like.dto';
import { ILikeRepository } from '../../src/modules/like/interfaces/like-repository.interface';
import { GetLikesByPostIdUseCase } from '../../src/modules/like/use-cases/get-likes-by-post-id.usecase';

describe('GetLikesByPostIdUseCase', () => {
  let useCase: GetLikesByPostIdUseCase;
  let likeRepository: jest.Mocked<ILikeRepository>;

  beforeEach(() => {
    likeRepository = {
      getLikesByPostId: jest.fn(),
    } as unknown as jest.Mocked<ILikeRepository>;

    useCase = new GetLikesByPostIdUseCase(likeRepository);
  });

  it('should return an array of LikeDTO when likes are found', async () => {
    const mockLikes = [
      {
        id: '1',
        userId: 'user-123',
        postId: 'post-1',
        post: { id: 'post-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: 'user-456',
        postId: 'post-1',
        post: { id: 'post-1' },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    likeRepository.getLikesByPostId.mockResolvedValue(mockLikes);

    const result = await useCase.execute('post-1');

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(LikeDTO);
    expect(result[0]).toEqual(new LikeDTO(mockLikes[0], { likeCount: 2, post: mockLikes[0].post }));
    expect(result[1]).toEqual(new LikeDTO(mockLikes[1], { likeCount: 2, post: mockLikes[1].post }));
    expect(likeRepository.getLikesByPostId).toHaveBeenCalledWith('post-1');
  });

  it('should return an empty array when no likes are found', async () => {
    likeRepository.getLikesByPostId.mockResolvedValue([]);

    const result = await useCase.execute('post-1');

    expect(result).toEqual([]);
    expect(likeRepository.getLikesByPostId).toHaveBeenCalledWith('post-1');
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    likeRepository.getLikesByPostId.mockRejectedValue(new HttpException('Error fetching likes by post ID', 500));

    await expect(useCase.execute('post-1')).rejects.toThrow(HttpException);
    expect(likeRepository.getLikesByPostId).toHaveBeenCalledWith('post-1');
  });
});
