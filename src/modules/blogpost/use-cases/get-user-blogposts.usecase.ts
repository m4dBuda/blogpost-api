import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../interfaces/blogpost-repository.interface';

@Injectable()
export class GetUserBlogPostsUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: IBlogPostRepository) {}

  public async execute(authorId: string): Promise<BlogPostDTO[]> {
    try {
      const posts = await this.blogPostRepository.getPostsByAuthor(authorId);
      if (posts.length === 0) {
        return [];
      }

      return posts.map((post) => {
        const likeCount = post.likes?.length || 0;
        const commentCount = post.comments?.length || 0;

        return new BlogPostDTO(post, { likeCount, commentCount });
      });
    } catch (error) {
      throw new HttpException(`Error fetching blog posts by author: ${error.message}`, error.status || 500);
    }
  }
}
