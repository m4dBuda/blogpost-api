import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  public page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public limit?: number = 10;
}
