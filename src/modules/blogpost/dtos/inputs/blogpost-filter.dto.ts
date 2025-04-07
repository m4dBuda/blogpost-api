import { IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

export class BlogPostFilterDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  public authorId?: string;

  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public content?: string;
}
