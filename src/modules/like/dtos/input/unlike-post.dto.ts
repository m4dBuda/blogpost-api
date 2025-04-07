import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UnlikePostDTO {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsOptional()
  userId: string;
}
