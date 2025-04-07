import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LikePostDTO {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsOptional()
  userId: string;
}
