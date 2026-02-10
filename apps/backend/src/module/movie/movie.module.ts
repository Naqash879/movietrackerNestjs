import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schema/movie.schema';
import MovieController from './movie.controller';
import MovieService from './movie.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService, JwtStrategy],
})
export default class MovieModule {}
