import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsNumber()
  @Type(() => Number)
  reviews: number;

  @IsOptional()
  image: string;
}
