import { axiosRequest, handleError } from "@/lib/axiosRequest";
import { TMovie } from "@/module/admin/schemas/admin.schema";

export async function addMovie(newAddMovie: TMovie) {
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
