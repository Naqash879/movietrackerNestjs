import { handleError } from "@/lib/axiosRequest";
import {
  addMovie,
  getMovies,
  deleteMovie,
  updateMovie,
  movieGetById,
} from "@/services/admin.service";
import { logout } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TUpdateMovie, TAddMovie } from "../schemas/admin.schema";
import toast from "react-hot-toast";

export const useAddMovieMutaton = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAddMovie: TAddMovie) => await addMovie(newAddMovie),
    onSuccess: (res) => {
      //console.log(res);
      toast.success("Add Movie Successfully");
      queryClient.invalidateQueries({
        queryKey: ["movies"],
      });
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
export const useGetMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => await getMovies(),
    initialData: [],
  });
};
export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await deleteMovie(id),
    onSuccess: (res) => {
      //console.log(res);
      toast.success("Successfully Deleted");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (error) => {
      const { message } = handleError(error);
      toast.error(message);
    },
  });
};
export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TUpdateMovie) => await updateMovie(data),
    onSuccess: (res) => {
      //console.log(res);
      toast.success("Successfully Updated");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
export const useGetMovieById = (id: string) => {
  return useQuery({
    queryKey: ["moviedetail", id],
    queryFn: () => movieGetById(id),
    enabled: !!id,
  });
};
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => await logout(),
    onSuccess: (res) => {
      toast.success("Logout Successfully");
    },
    onError: (err) => {
      const { message } = handleError(err);
      toast.error(message);
    },
  });
};
