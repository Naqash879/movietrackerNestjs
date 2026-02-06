import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Delete,
  Param,
  Put,
  //Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieDto } from './dto/movie.dto';
import MovieService from './movie.service';
import { multerMemory } from 'src/config/multer.config';
import { UpdateMovieDto } from './dto/movieUpdateDto';

@Controller('admin')
export default class MovieController {
  constructor(private movieService: MovieService) {}
  @Post('addmovie')
  @UseInterceptors(FileInterceptor('image', multerMemory))
  async addMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: MovieDto,
  ) {
    if (!file) {
      throw new BadRequestException('image Required');
    }
    const res = await this.movieService.addMovie(body, file);
    return {
      data: res,
    };
  }
  @Get('movies')
  async getMovies() {
    const res = await this.movieService.getMovies();
    return { data: res };
  }
  @Get('getMovieById/:id')
  async getMovieById(@Param('id') id: string) {
    const res = await this.movieService.getMovieById(id);
    return { data: res };
  }
  @Delete('deletemovie/:id')
  async deleteMovie(@Param('id') id: string) {
    const res = await this.movieService.deleteMovie(id);

    return { data: res };
  }
  @Put('updateMovie/:_id')
  @UseInterceptors(FileInterceptor('image', multerMemory))
  async updateMovie(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateMovieDto,
    @Param('_id') _id: string,
    //@Req() req: Request,
  ) {
    const res = await this.movieService.updateMovie(_id, dto, file);
    return {
      data: res,
      //token: req.cookies.refreshToken,
    };
  }
}
