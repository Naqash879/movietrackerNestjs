"use client";
import { useState } from "react";
import AddMovieModal from "../components/AddMovieModal";
type Movie = {
  id: string;
  image: string;
  name: string;
  description: string;
  reviews: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎬 Movies Admin Dashboard</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Movie
        </button>
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
            {movies.map((movie) => (
              <tr key={movie.id} className="border-t hover:bg-gray-50">
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
                  <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                    Update
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {open && <AddMovieModal onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
