import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { UpdateBlogPostDTO } from '../dtos/inputs/update-blogpost.dto';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';

@Injectable()
export class UpdateBlogPostUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: BlogPostRepository) {}

  public async execute(id: string, data: UpdateBlogPostDTO): Promise<BlogPostDTO> {
    const post = await this.blogPostRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    if (post.authorId !== data.authorId) {
      throw new ForbiddenException(`You are not allowed to update this blog post`);
    }

    const updatedPost = await this.blogPostRepository.updatePost(id, data);

    const likeCount = updatedPost.likes?.length || 0;
    const commentCount = updatedPost.comments?.length || 0;

    return new BlogPostDTO(updatedPost, { likeCount, commentCount });
  }
}
