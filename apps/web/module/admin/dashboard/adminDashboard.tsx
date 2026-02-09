"use client";
import { useState } from "react";
import AddMovieModal from "../components/AddMovieModal";
import {
  useDeleteMovie,
  useGetMovies,
  useLogoutMutation,
} from "../hooks/admin.hooks";
import UpdateMovie from "../components/UpdateMovie";
import { TMovie } from "../schemas/admin.schema";
import React from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [updateMovie, setUpdateMovie] = useState<TMovie | null>(null);

  const { data, isError, error, isPending } = useGetMovies();
  const mutationDeleteMovie = useDeleteMovie();
  const mutationLogout = useLogoutMutation();

  const route = useRouter();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error?.message}</p>;

  const handleDelete = (id: string) => {
    mutationDeleteMovie.mutate(id);
  };

  const handleUpdateMovie = (movie: TMovie) => {
    setUpdateMovie(movie);
    setIsOpenUpdateModal(true);
  };

  const handleLogout = () => {
    mutationLogout.mutate();
  };
  const handleHome = () => {
    route.push("/");
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 Movies Admin Dashboard</h1>
        <div className="space-x-2 space-y-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Movie
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
          <button
            onClick={handleHome}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Home
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Reviews</th>
              <th className="p-3 text-center">Rating</th>
              <th className="p-3 text-center">Created</th>
              <th className="p-3 text-center">Updated</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  Movie Not Found
                </td>
              </tr>
            ) : (
              data.map((movie: TMovie) => (
                <React.Fragment key={movie._id}>
                  {isOpenUpdateModal && movie._id === updateMovie?._id && (
                    <tr>
                      <td colSpan={8}>
                        <UpdateMovie
                          movie={updateMovie}
                          onClose={() => setIsOpenUpdateModal(false)}
                        />
                      </td>
                    </tr>
                  )}

                  <tr className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="w-16 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 font-medium">{movie.name}</td>
                    <td className="p-3 text-gray-600 line-clamp-2 max-w-xs">
                      {movie.description}
                    </td>
                    <td className="p-3 text-center">{movie.reviews}k</td>
                    <td className="p-3 text-center">⭐ {movie.rating}</td>
                    <td className="p-3 text-center">{movie.createdAt}</td>
                    <td className="p-3 text-center">{movie.updatedAt}</td>
                    <td className="p-3 text-center space-x-2 space-y-2">
                      <button
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleUpdateMovie(movie)}
                      >
                        Update
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
        {open && <AddMovieModal onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
