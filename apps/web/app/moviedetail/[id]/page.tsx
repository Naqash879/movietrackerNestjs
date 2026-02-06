"use client";
import MovieDetail from "@/module/moviedetail/moviedetail";
import { useParams } from "next/navigation";

export default function HomeMovieDetail() {
  const { id } = useParams();
  return (
    <>
      <div className="flex gap-6 flex-col min-h-screen p-2  bg-zinc-50 font-sans dark:bg-black">
        <MovieDetail movieId={id as string} />
      </div>
    </>
  );
}
