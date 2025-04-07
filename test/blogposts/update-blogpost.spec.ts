import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UpdateBlogPostDTO } from '../../src/modules/blogpost/dtos/inputs/update-blogpost.dto';
import { BlogPostDTO } from '../../src/modules/blogpost/dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../../src/modules/blogpost/interfaces/blogpost-repository.interface';
import { UpdateBlogPostUseCase } from '../../src/modules/blogpost/use-cases/update-blogpost.usecase';

describe('UpdateBlogPostUseCase', () => {
  let useCase: UpdateBlogPostUseCase;
  let blogPostRepository: jest.Mocked<IBlogPostRepository>;

  beforeEach(() => {
    blogPostRepository = {
      getPostById: jest.fn(),
      updatePost: jest.fn(),
    } as unknown as jest.Mocked<IBlogPostRepository>;

    useCase = new UpdateBlogPostUseCase(blogPostRepository);
  });

  it('should update a blog post and return BlogPostDTO', async () => {
    const mockBlogPost = {
      id: '1',
      title: 'Updated Blog Post',
      content: 'This is the updated content.',
      authorId: 'user-123',
      likes: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true,
    };

    const mockUpdateBlogPostDTO: UpdateBlogPostDTO = {
      title: 'Updated Blog Post',
      content: 'This is the updated content.',
      authorId: 'user-123',
    };

    blogPostRepository.getPostById.mockResolvedValue(mockBlogPost);
    blogPostRepository.updatePost.mockResolvedValue(mockBlogPost);

    const result = await useCase.execute('1', mockUpdateBlogPostDTO);

    expect(result).toBeInstanceOf(BlogPostDTO);
    expect(result).toEqual(new BlogPostDTO(mockBlogPost, { likeCount: 0, commentCount: 0 }));
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
    expect(blogPostRepository.updatePost).toHaveBeenCalledWith('1', mockUpdateBlogPostDTO);
  });

  it('should throw NotFoundException when the blog post is not found', async () => {
    blogPostRepository.getPostById.mockResolvedValue(null);

    const mockUpdateBlogPostDTO: UpdateBlogPostDTO = {
      title: 'Updated Blog Post',
      content: 'This is the updated content.',
      authorId: 'user-123',
    };

    await expect(useCase.execute('1', mockUpdateBlogPostDTO)).rejects.toThrow(NotFoundException);
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
  });

  it('should throw ForbiddenException when the user is not the author', async () => {
    const mockBlogPost = {
      id: '1',
      title: 'My Blog Post',
      content: 'This is the content.',
      authorId: 'user-456',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockUpdateBlogPostDTO: UpdateBlogPostDTO = {
      title: 'Updated Blog Post',
      content: 'This is the updated content.',
      authorId: 'user-123',
    };

    blogPostRepository.getPostById.mockResolvedValue(mockBlogPost);

    await expect(useCase.execute('1', mockUpdateBlogPostDTO)).rejects.toThrow(ForbiddenException);
    expect(blogPostRepository.getPostById).toHaveBeenCalledWith('1');
  });
});
