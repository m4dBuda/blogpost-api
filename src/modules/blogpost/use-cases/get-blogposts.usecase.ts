import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { BlogPostFilterDTO } from '../dtos/inputs/blogpost-filter.dto';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';

@Injectable()
export class GetBlogPostsUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: BlogPostRepository) {}

  public async execute(filter?: BlogPostFilterDTO): Promise<BlogPostDTO[]> {
    try {
      const posts = await this.blogPostRepository.getPosts(filter);
      if (!posts || posts.length === 0) {
        return [];
      }

      return posts.map((post) => {
        const likeCount = post.likes?.length || 0;
        const commentCount = post.comments?.length || 0;

        return new BlogPostDTO(post, { likeCount, commentCount });
      });
    } catch (error) {
      throw new InternalServerErrorException(`Error fetching blog posts: ${error.message}`);
    }
  }
}
