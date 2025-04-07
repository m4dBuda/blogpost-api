import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogPostDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsBoolean()
  published: boolean;

  @IsOptional()
  authorId?: string;
}
