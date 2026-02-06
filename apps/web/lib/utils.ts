import { TMovie } from "@/module/admin/schemas/admin.schema";
export type TMovieProvider = {
  movie: TMovie[];
  setMovie: React.Dispatch<React.SetStateAction<TMovie[]>>;
};
