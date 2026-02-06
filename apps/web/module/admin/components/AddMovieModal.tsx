import toast from "react-hot-toast";
import { useAddMovieMutaton } from "../hooks/admin.hooks";
type AddMovieModalProps = {
  onClose: () => void;
};

export default function AddMovieModal({ onClose }: AddMovieModalProps) {
  const addMovieMutation = useAddMovieMutaton();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("image") as HTMLInputElement;

    const file = fileInput.files?.[0];
    const rating = Number(
      (form.elements.namedItem("reviews") as HTMLInputElement).value,
    );
    const reviews = Number(
      (form.elements.namedItem("rating") as HTMLInputElement).value,
    );
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLTextAreaElement
    ).value;
    if (!file) return toast.error("image required");

    const newMovie = {
      image: file,
      name: name,
      description: description,
      reviews: reviews,
      rating: rating,
    };
    addMovieMutation.mutate(newMovie);
    //onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">➕ Add New Movie</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
          />

          <input
            name="name"
            placeholder="Movie Name"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="reviews"
              type="number"
              placeholder="Reviews"
              className="border p-2 rounded"
            />
            <input
              name="rating"
              type="number"
              step="0.1"
              min=""
              max="10"
              placeholder="Rating (0–10)"
              className="border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
