import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BlogPostRepository } from '../blogpost.repository';
import { CreateBlogPostDTO } from '../dtos/inputs/create-blogpost.dto';
import { BlogPostDTO } from '../dtos/outputs/blogpost.dto';
import { IBlogPostRepository } from '../interfaces/blogpost-repository.interface';

@Injectable()
export class CreateBlogPostUseCase {
  constructor(@Inject(BlogPostRepository) private readonly blogPostRepository: IBlogPostRepository) {}

  public async execute(data: CreateBlogPostDTO): Promise<BlogPostDTO> {
    try {
      const response = await this.blogPostRepository.createPost(data);
      return new BlogPostDTO(response);
    } catch (error) {
      throw new HttpException(`Error creating blog post: ${error.message}`, error.status || 500);
    }
  }
}
