import { Body, Controller, Get, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/dtos/authenticated-request.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { BlogPostFilterDTO } from './dtos/inputs/blogpost-filter.dto';
import { CreateBlogPostDTO } from './dtos/inputs/create-blogpost.dto';
import { UpdateBlogPostDTO } from './dtos/inputs/update-blogpost.dto';
import { BlogPostDTO } from './dtos/outputs/blogpost.dto';
import { CreateBlogPostUseCase } from './use-cases/create-blogpost.usecase';
import { GetBlogPostByIdUseCase } from './use-cases/get-blogpost-by-id.usecase';
import { GetBlogPostsUseCase } from './use-cases/get-blogposts.usecase';
import { GetUserBlogPostsUseCase } from './use-cases/get-user-blogposts.usecase';
import { UpdateBlogPostUseCase } from './use-cases/update-blogpost.usecase';

@UseGuards(AuthGuard)
@Controller('post')
export class BlogPostController {
  constructor(
    @Inject(CreateBlogPostUseCase)
    private readonly $create: CreateBlogPostUseCase,
    @Inject(GetBlogPostsUseCase)
    private readonly $getAll: GetBlogPostsUseCase,
    @Inject(GetBlogPostByIdUseCase)
    private readonly $getById: GetBlogPostByIdUseCase,
    @Inject(GetUserBlogPostsUseCase)
    private readonly $getAllByUser: GetUserBlogPostsUseCase,
    @Inject(UpdateBlogPostUseCase)
    private readonly $update: UpdateBlogPostUseCase,
  ) {}

  @Post()
  public async createPost(@Body() data: CreateBlogPostDTO, @Request() req: AuthenticatedRequest): Promise<BlogPostDTO> {
    data.authorId = req.user.id;
    return this.$create.execute(data);
  }

  @Get()
  public async getPosts(@Query() filter?: BlogPostFilterDTO): Promise<BlogPostDTO[]> {
    return this.$getAll.execute(filter);
  }

  @Get(':id')
  public async getPostById(@Param('id') id: string): Promise<BlogPostDTO> {
    return this.$getById.execute(id);
  }

  @Get('author/:authorId')
  public async getPostsByAuthor(@Param('authorId') authorId: string): Promise<BlogPostDTO[]> {
    return this.$getAllByUser.execute(authorId);
  }

  @Put(':id')
  public async updatePost(
    @Param('id') id: string,
    @Body() data: UpdateBlogPostDTO,
    @Request() req: AuthenticatedRequest,
  ): Promise<BlogPostDTO> {
    data.authorId = req.user.id;
    return this.$update.execute(id, data);
  }
}
