import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ToggleLikePostDTO {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsOptional()
  userId: string;
}
