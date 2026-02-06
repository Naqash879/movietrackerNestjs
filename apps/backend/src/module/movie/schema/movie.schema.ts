import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;
@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  reviews: number;
  @Prop({ required: true })
  rating: number;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
