import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';

@Injectable()
export class GetBlogPostByIdUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: BlogPostRepository) {}
  public async execute(id: string): Promise<BlogPostDTO> {
    try {
      const post = await this.blogPostRepository.getPostById(id);
      if (!post) {
        throw new InternalServerErrorException(`Blog post with ID ${id} not found`);
      }

      const likeCount = post.likes?.length || 0;
      const commentCount = post.comments?.length || 0;

      return new BlogPostDTO(post, { likeCount, commentCount });
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching blog post by ID: ${error.message}`);
    }
  }
}
