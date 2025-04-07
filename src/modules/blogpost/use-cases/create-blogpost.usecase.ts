import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { CreateBlogPostDTO } from '../dtos/inputs/create-blogpost.dto';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';

@Injectable()
export class CreateBlogPostUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: BlogPostRepository) {}

  public async execute(data: CreateBlogPostDTO): Promise<BlogPostDTO> {
    try {
      const response = await this.blogPostRepository.createPost(data);
      return new BlogPostDTO(response);
    } catch (error) {
      throw new InternalServerErrorException(`Error creating blog post: ${error.message}`);
    }
  }
}
