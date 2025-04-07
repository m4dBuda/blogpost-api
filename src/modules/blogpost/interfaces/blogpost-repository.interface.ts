import { BlogPostEntity } from '../blogpost.entity';
import { BlogPostFilterDTO } from '../dtos/inputs/blogpost-filter.dto';
import { CreateBlogPostDTO } from '../dtos/inputs/create-blogpost.dto';
import { UpdateBlogPostDTO } from '../dtos/inputs/update-blogpost.dto';

export interface IBlogPostRepository {
  getPostById(id: string): Promise<BlogPostEntity | null>;
  createPost(post: CreateBlogPostDTO): Promise<BlogPostEntity>;
  getPosts(filter: BlogPostFilterDTO): Promise<BlogPostEntity[]>;
  getPostsByAuthor(authorId: string): Promise<BlogPostEntity[]>;
  updatePost(id: string, post: UpdateBlogPostDTO): Promise<BlogPostEntity>;
}
