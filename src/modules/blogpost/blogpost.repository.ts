import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from '../../infrastructure/database/database-connection.interface';
import { BlogPostEntity } from './blogpost.entity';
import { BlogPostFilterDTO } from './dtos/inputs/blogpost-filter.dto';
import { CreateBlogPostDTO } from './dtos/inputs/create-blogpost.dto';
import { UpdateBlogPostDTO } from './dtos/inputs/update-blogpost.dto';
import { IBlogPostRepository } from './interfaces/blogpost-repository.interface';

@Injectable()
export class BlogPostRepository implements IBlogPostRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async getPostById(id: string): Promise<BlogPostEntity | null> {
    return this.$db.blogPost.findUnique({
      where: { id },
      include: {
        comments: {
          select: {
            id: true,
            content: true,
            authorId: true,
            postId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            postId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  public async createPost(data: CreateBlogPostDTO): Promise<BlogPostEntity> {
    return this.$db.blogPost.create({
      data: { ...data },
    });
  }

  public async getPosts(filter?: BlogPostFilterDTO): Promise<BlogPostEntity[]> {
    const page = filter?.page || 1;
    const limit = filter?.limit || 10;
    const skip = (page - 1) * limit;

    return this.$db.blogPost.findMany({
      where: {
        ...(filter?.title && {
          title: {
            contains: filter.title,
            mode: 'insensitive',
          },
        }),
        ...(filter?.content && {
          content: {
            contains: filter.content,
            mode: 'insensitive',
          },
        }),
        ...(filter?.authorId && { authorId: filter.authorId }),
      },
      take: limit,
      skip: skip,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            authorId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            postId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  public async getPostsByAuthor(authorId: string): Promise<BlogPostEntity[]> {
    return this.$db.blogPost.findMany({
      where: { authorId },
      include: {
        comments: {
          select: {
            id: true,
            content: true,
            authorId: true,
            postId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            postId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  public async updatePost(id: string, data: UpdateBlogPostDTO): Promise<BlogPostEntity> {
    return this.$db.blogPost.update({
      where: { id },
      data: { ...data },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            authorId: true,
            postId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          select: {
            id: true,
            postId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }
}
