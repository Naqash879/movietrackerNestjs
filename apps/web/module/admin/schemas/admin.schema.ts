export type TMovie = {
  _id: string;
  name: string;
  image: File;
  description: string;
  rating: number;
  reviews: number;
  createdAt?: string;
  updatedAt?: string;
};
export type TAddMovie = {
  name: string;
  image: File;
  description: string;
  rating: number;
  reviews: number;
};
export type TUpdateMovie = {
  _id: string;
  name: string;
  image: File | undefined;
  description: string;
  rating: number;
  reviews: number;
};
export type TUpdateMovieProps = {
  movie: TMovie;
  onClose: () => void;
};
