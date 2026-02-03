import MovieDetail from "@/module/moviedetail/moviedetail";

export default function HomeMovieDetail() {
  return (
    <>
      <div className="flex gap-6 flex-col min-h-screen p-2  bg-zinc-50 font-sans dark:bg-black">
        <MovieDetail />
      </div>
    </>
  );
}
