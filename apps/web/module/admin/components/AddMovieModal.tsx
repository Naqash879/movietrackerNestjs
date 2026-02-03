type AddMovieModalProps = {
  onClose: () => void;
  onAdd: (movie: any) => void;
};

export default function AddMovieModal({ onClose, onAdd }: AddMovieModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("image") as HTMLInputElement;

    const file = fileInput.files?.[0];

    if (!file) return;

    const newMovie = {
      id: Date.now().toString(),
      image: file,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      reviews: Number(
        (form.elements.namedItem("reviews") as HTMLInputElement).value,
      ),
      rating: Number(
        (form.elements.namedItem("rating") as HTMLInputElement).value,
      ),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(newMovie);
    onAdd(newMovie);
    onClose();
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
            required
          />

          <input
            name="name"
            placeholder="Movie Name"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="reviews"
              type="number"
              placeholder="Reviews"
              className="border p-2 rounded"
              required
            />
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="Rating (0–10)"
              className="border p-2 rounded"
              required
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
