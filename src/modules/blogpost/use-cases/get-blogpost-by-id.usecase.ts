import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../interfaces/blogpost-repository.interface';

@Injectable()
export class GetBlogPostByIdUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: IBlogPostRepository) {}
  public async execute(id: string): Promise<BlogPostDTO> {
    try {
      const post = await this.blogPostRepository.getPostById(id);
      if (!post) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      const likeCount = post.likes?.length || 0;
      const commentCount = post.comments?.length || 0;

      return new BlogPostDTO(post, { likeCount, commentCount });
    } catch (error) {
      throw new HttpException(`Error fetching blog post by ID: ${error.message}`, error.status || 500);
    }
  }
}
