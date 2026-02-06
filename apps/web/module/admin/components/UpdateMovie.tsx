import React, { useState, useEffect } from "react";
import { TMovie } from "../schemas/admin.schema";
import { TUpdateMovieProps } from "../schemas/admin.schema";
import { useUpdateMovie } from "../hooks/admin.hooks";

const UpdateMovie = ({ onClose, movie }: TUpdateMovieProps) => {
  const mutationUpdateMovie = useUpdateMovie();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;
    const rating = Number(
      (form.elements.namedItem("rating") as HTMLInputElement).value,
    );
    const reviews = Number(
      (form.elements.namedItem("reviews") as HTMLInputElement).value,
    );
    const fileInput = form.elements.namedItem("image") as HTMLInputElement;
    const file = fileInput.files?.[0];
    const _id = movie._id;
    const updateMovie = {
      _id,
      name,
      description,
      rating,
      reviews,
      image: file,
    };
    mutationUpdateMovie.mutate(updateMovie);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
        <h2 className="text-2xl font-semibold mb-4">Update Movie</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={movie.name}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              defaultValue={movie.description}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Image URL</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Rating</label>
            <input
              type="number"
              defaultValue={movie.rating}
              name="rating"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              min={0}
              max={10}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Reviews (k)</label>
            <input
              type="number"
              defaultValue={movie.reviews}
              name="reviews"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              min={0}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
