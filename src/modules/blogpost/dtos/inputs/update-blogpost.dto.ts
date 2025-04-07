import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateBlogPostDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  authorId?: string;
}
