import { HttpException } from '@nestjs/common';
import { BlogPostFilterDTO } from '../../src/modules/blogpost/dtos/inputs/blogpost-filter.dto';
import { BlogPostDTO } from '../../src/modules/blogpost/dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../../src/modules/blogpost/interfaces/blogpost-repository.interface';
import { GetBlogPostsUseCase } from '../../src/modules/blogpost/use-cases/get-blogposts.usecase';

describe('GetBlogPostsUseCase', () => {
  let useCase: GetBlogPostsUseCase;
  let blogPostRepository: jest.Mocked<IBlogPostRepository>;

  beforeEach(() => {
    blogPostRepository = {
      getPosts: jest.fn(),
    } as unknown as jest.Mocked<IBlogPostRepository>;

    useCase = new GetBlogPostsUseCase(blogPostRepository);
  });

  it('should return an array of BlogPostDTO when posts are found', async () => {
    const mockPosts = [
      {
        id: '1',
        title: 'First Blog Post',
        content: 'This is the first blog post.',
        authorId: 'user-123',
        likes: [{ id: 'like1' }, { id: 'like2' }],
        comments: [{ id: 'comment1' }],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
      {
        id: '2',
        title: 'Second Blog Post',
        content: 'This is the second blog post.',
        authorId: 'user-456',
        likes: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
      },
    ];

    blogPostRepository.getPosts.mockResolvedValue(mockPosts);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(BlogPostDTO);
    expect(result[0]).toEqual(
      new BlogPostDTO(mockPosts[0], {
        likeCount: 2,
        commentCount: 1,
      }),
    );
    expect(result[1]).toEqual(
      new BlogPostDTO(mockPosts[1], {
        likeCount: 0,
        commentCount: 0,
      }),
    );
    expect(blogPostRepository.getPosts).toHaveBeenCalledWith(undefined);
  });

  it('should return an empty array when no posts are found', async () => {
    blogPostRepository.getPosts.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(blogPostRepository.getPosts).toHaveBeenCalledWith(undefined);
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    blogPostRepository.getPosts.mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute()).rejects.toThrow(HttpException);
    expect(blogPostRepository.getPosts).toHaveBeenCalledWith(undefined);
  });

  it('should apply filters when provided', async () => {
    const mockFilter: BlogPostFilterDTO = {
      authorId: 'user-123',
      published: true,
    };

    const mockPosts = [
      {
        id: '1',
        title: 'Filtered Blog Post',
        content: 'This is a filtered blog post.',
        authorId: 'user-123',
        likes: [],
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      },
    ];

    blogPostRepository.getPosts.mockResolvedValue(mockPosts);

    const result = await useCase.execute(mockFilter);

    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(BlogPostDTO);
    expect(result[0]).toEqual(
      new BlogPostDTO(mockPosts[0], {
        likeCount: 0,
        commentCount: 0,
      }),
    );
    expect(blogPostRepository.getPosts).toHaveBeenCalledWith(mockFilter);
  });
});
