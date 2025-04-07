import { Module } from '@nestjs/common';
import { BlogPostController } from './blogpost.controller';
import { BlogPostRepository } from './blogpost.repository';
import { CreateBlogPostUseCase } from './use-cases/create-blogpost.usecase';
import { GetBlogPostByIdUseCase } from './use-cases/get-blogpost-by-id.usecase';
import { GetBlogPostsUseCase } from './use-cases/get-blogposts.usecase';
import { GetUserBlogPostsUseCase } from './use-cases/get-user-blogposts.usecase';
import { UpdateBlogPostUseCase } from './use-cases/update-blogpost.usecase';

@Module({
  controllers: [BlogPostController],
  providers: [
    BlogPostRepository,
    CreateBlogPostUseCase,
    GetBlogPostsUseCase,
    GetBlogPostByIdUseCase,
    GetUserBlogPostsUseCase,
    UpdateBlogPostUseCase,
  ],
})
export class BlogpostModule {}
