import { axiosRequest, handleError } from "@/lib/axiosRequest";
import { TAddMovie, TUpdateMovie } from "@/module/admin/schemas/admin.schema";

export async function addMovie(newAddMovie: TAddMovie) {
  console.log(newAddMovie);
  try {
    const formData = new FormData();
    if (newAddMovie.image) {
      formData.append("image", newAddMovie.image);
    }
    formData.append("name", newAddMovie.name);
    formData.append("description", newAddMovie.description);
    formData.append("reviews", String(newAddMovie.reviews));
    formData.append("rating", String(newAddMovie.rating));
    const res = await axiosRequest.post("/admin/addmovie", formData);
    return res.data;
  } catch (err) {
    const { message } = handleError(err);
    throw new Error(message);
  }
}
export async function getMovies() {
  try {
    const res = await axiosRequest.get("/admin/movies");
    return res.data.data;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
}
export const deleteMovie = async (id: string) => {
  try {
    const res = await axiosRequest.delete(`admin/deletemovie/${id}`);
    return res.data;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
export const updateMovie = async (data: TUpdateMovie) => {
  try {
    const { _id } = data;
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("rating", String(data.rating));
    formData.append("reviews", String(data.reviews));
    const res = await axiosRequest.put(`admin/updatemovie/${_id}`, formData);
    return res;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
export const movieGetById = async (id: string) => {
  try {
    const res = await axiosRequest.get(`/admin/getMovieById/${id}`);
    return res.data.data;
  } catch (error) {
    const { message } = handleError(error);
    throw new Error(message);
  }
};
