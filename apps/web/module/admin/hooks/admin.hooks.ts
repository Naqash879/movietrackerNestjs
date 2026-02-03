import { handleError } from "@/lib/axiosRequest";
import { addMovie } from "@/services/admin.service";
import { useMutation } from "@tanstack/react-query";
import { TMovie } from "../schemas/admin.schema";
import toast from "react-hot-toast";

export const useAddMovieMutaton = () => {
  return useMutation({
    mutationFn: async (newAddMovie: TMovie) => await addMovie(newAddMovie),
    onSuccess: (res) => {
      toast.success("Add Movie Successfully");
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
