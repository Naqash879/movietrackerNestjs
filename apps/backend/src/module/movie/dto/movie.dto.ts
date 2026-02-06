import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class MovieDto {
  @IsNotEmpty({ message: 'name Required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'description Required' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'reviews Required' })
  @IsNumber()
  @Type(() => Number)
  reviews: number;

  @IsNotEmpty({ message: 'rating Required' })
  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsOptional()
  image?: string;
}
