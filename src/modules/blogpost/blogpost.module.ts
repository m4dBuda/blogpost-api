import { Module } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { BlogPostController } from './blogpost.controller';
import { BlogPostRepository } from './blogpost.repository';
import { CreateBlogPostUseCase } from './use-cases/create-blogpost.usecase';
import { GetBlogPostsUseCase } from './use-cases/get-blogposts.usecase';
import { GetBlogPostByIdUseCase } from './use-cases/get-post-by-id.usecase';
import { GetUserBlogPostsUseCase } from './use-cases/get-user-blogposts.usecase';
import { UpdateBlogPostUseCase } from './use-cases/update-blogpost.usecase';

@Module({
  controllers: [BlogPostController],
  providers: [
    UserRepository,
    BlogPostRepository,
    CreateBlogPostUseCase,
    GetBlogPostsUseCase,
    GetBlogPostByIdUseCase,
    GetUserBlogPostsUseCase,
    UpdateBlogPostUseCase,
  ],
})
export class BlogpostModule {}
