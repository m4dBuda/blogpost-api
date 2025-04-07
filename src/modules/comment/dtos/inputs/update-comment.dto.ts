import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDTO {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  authorId: string;
}
