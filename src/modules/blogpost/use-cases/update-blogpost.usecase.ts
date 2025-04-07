import { ForbiddenException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { UpdateBlogPostDTO } from '../dtos/inputs/update-blogpost.dto';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../interfaces/blogpost-repository.interface';

@Injectable()
export class UpdateBlogPostUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: IBlogPostRepository) {}

  public async execute(id: string, data: UpdateBlogPostDTO): Promise<BlogPostDTO> {
    await this.findPostAndValidate(id, data);
    try {
      const updatedPost = await this.blogPostRepository.updatePost(id, data);

      const likeCount = updatedPost.likes?.length || 0;
      const commentCount = updatedPost.comments?.length || 0;

      return new BlogPostDTO(updatedPost, { likeCount, commentCount });
    } catch (error) {
      throw new HttpException(`Error updating blog post: ${error.message}`, error.status || 500);
    }
  }

  private async findPostAndValidate(id: string, data: UpdateBlogPostDTO): Promise<void> {
    const post = await this.blogPostRepository.getPostById(id);
    if (!post) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    if (post.authorId !== data.authorId) {
      throw new ForbiddenException(`You are not allowed to update this blog post`);
    }
  }
}
