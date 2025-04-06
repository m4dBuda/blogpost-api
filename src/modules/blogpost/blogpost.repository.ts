import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseConnection } from 'src/infrastructure/database/database-connection.interface';

@Injectable()
export class BlogPostRepository {
  constructor(@Inject('DATABASE') private readonly $db: IDatabaseConnection) {}

  public async create(data: any): Promise<any> {
    try {
      return this.$db.blogPost.create({
        data: { ...data },
        include: {
          author: true,
        },
      });
    } catch (error) {
      throw new Error(`Error creating blog post: ${error.message}`);
    }
  }
}
