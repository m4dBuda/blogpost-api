import { HttpException } from '@nestjs/common';
import { CreateBlogPostDTO } from '../../src/modules/blogpost/dtos/inputs/create-blogpost.dto';
import { BlogPostDTO } from '../../src/modules/blogpost/dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../../src/modules/blogpost/interfaces/blogpost-repository.interface';
import { CreateBlogPostUseCase } from '../../src/modules/blogpost/use-cases/create-blogpost.usecase';

describe('CreateBlogPostUseCase', () => {
  let useCase: CreateBlogPostUseCase;
  let blogPostRepository: jest.Mocked<IBlogPostRepository>;

  beforeEach(() => {
    blogPostRepository = {
      createPost: jest.fn(),
    } as unknown as jest.Mocked<IBlogPostRepository>;

    useCase = new CreateBlogPostUseCase(blogPostRepository);
  });

  it('should create a blog post and return BlogPostDTO', async () => {
    const mockBlogPost = {
      id: '1',
      title: 'My First Blog Post',
      content: 'This is the content of my blog post.',
      authorId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false,
    };

    const mockCreateBlogPostDTO: CreateBlogPostDTO = {
      title: 'My First Blog Post',
      content: 'This is the content of my blog post.',
      authorId: 'user-123',
      published: false,
    };

    blogPostRepository.createPost.mockResolvedValue(mockBlogPost);

    const result = await useCase.execute(mockCreateBlogPostDTO);

    expect(result).toBeInstanceOf(BlogPostDTO);
    expect(result).toEqual(new BlogPostDTO(mockBlogPost));
    expect(blogPostRepository.createPost).toHaveBeenCalledWith(mockCreateBlogPostDTO);
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    const mockCreateBlogPostDTO: CreateBlogPostDTO = {
      title: 'My First Blog Post',
      content: 'This is the content of my blog post.',
      authorId: 'user-123',
      published: false,
    };

    blogPostRepository.createPost.mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute(mockCreateBlogPostDTO)).rejects.toThrow(HttpException);
    expect(blogPostRepository.createPost).toHaveBeenCalledWith(mockCreateBlogPostDTO);
  });
});
