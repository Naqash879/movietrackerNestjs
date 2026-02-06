import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MovieDocument } from './schema/movie.schema';
import { Movie } from './schema/movie.schema';
import { Model } from 'mongoose';
import { MovieDto } from './dto/movie.dto';
import cloudinary from 'src/config/cloudinary.config';
import { UpdateMovieDto } from './dto/movieUpdateDto';

@Injectable()
export default class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>,
  ) {}
  async addMovie(dto: MovieDto, file: Express.Multer.File) {
    const upload = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      { folder: 'movies' },
    );
    const newMovie = {
      ...dto,
      image: upload.secure_url,
    };
    const res = await new this.movieModel(newMovie).save();
    return res;
  }
  async getMovies() {
    try {
      const movies = await this.movieModel.find();
      return movies;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'something went wrong to get Movies',
      );
    }
  }
  async getMovieById(id: string) {
    if (!id) throw new BadRequestException('Movie ID not provided');
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);
    return movie;
  }
  async deleteMovie(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('id not found');
      }
      const res = await this.movieModel.findByIdAndDelete({ _id: id });
      if (!res) {
        throw new NotFoundException(`Movie with id ${id} not found`);
      }
      return { message: 'Movie deleted successfully', id };
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'something went wrong to delete Movies',
      );
    }
  }
  async updateMovie(
    _id: string,
    dto: UpdateMovieDto,
    file: Express.Multer.File,
  ) {
    try {
      if (!_id) {
        throw new BadRequestException('Id not Found');
      }
      const newUpdateMovie: any = {
        name: dto.name,
        description: dto.description,
        rating: dto.rating,
        reviews: dto.reviews,
      };
      if (file) {
        const upload = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
          { folder: 'movies' },
        );
        newUpdateMovie.image = upload.secure_url;
      }
      const response = await this.movieModel.findByIdAndUpdate(
        _id,
        newUpdateMovie,
        { new: true },
      );
      if (!response) {
        throw new NotFoundException(`Movie of this id ${_id} is not found`);
      }
      return response;
    } catch (err) {
      throw err?.message;
    }
  }
}
