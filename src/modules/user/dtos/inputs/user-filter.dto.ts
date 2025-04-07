import { IsOptional, IsString } from 'class-validator';

export class UserFilterDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
