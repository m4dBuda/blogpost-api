import { HttpException, NotFoundException } from '@nestjs/common';
import { BlogPostDTO } from '../../src/modules/blogpost/dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../../src/modules/blogpost/interfaces/blogpost-repository.interface';
import { GetBlogPostByIdUseCase } from '../../src/modules/blogpost/use-cases/get-blogpost-by-id.usecase';

describe('GetBlogPostByIdUseCase', () => {
  let useCase: GetBlogPostByIdUseCase;
  let blogPostRepository: jest.Mocked<IBlogPostRepository>;

  beforeEach(() => {
    blogPostRepository = {
      getPostById: jest.fn(),
    } as unknown as jest.Mocked<IBlogPostRepository>;

    useCase = new GetBlogPostByIdUseCase(blogPostRepository);
  });

  it('should return a BlogPostDTO when the blog post is found', async () => {
    const mockBlogPost = {
      id: '1',
      title: 'My Blog Post',
      content: 'This is the content of my blog post.',
      authorId: 'user-123',
      likes: [{ id: 'like1' }, { id: 'like2' }],
      comments: [{ id: 'comment1' }],
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
    };

    blogPostRepository.getPostById.mockResolvedValue(mockBlogPost);

    const result = await useCase.execute('1');

    expect(result).toBeInstanceOf(BlogPostDTO);
    expect(result).toEqual(
      new BlogPostDTO(mockBlogPost, {
        likeCount: 2,
        commentCount: 1,
      }),
    );
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when the blog post is not found', async () => {
    blogPostRepository.getPostById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toThrow(NotFoundException);
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    blogPostRepository.getPostById.mockRejectedValue(new HttpException('Error fetching blog post by ID:', 500));

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
  });
});
