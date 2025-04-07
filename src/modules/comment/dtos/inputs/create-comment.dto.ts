import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  authorId: string;
}
