"use client";
import Header from "../header/header";
import { useState } from "react";
import { useGetMovieById } from "../admin/hooks/admin.hooks";
import { useRouter } from "next/navigation";
export default function MovieDetail({ movieId }: { movieId: string }) {
  const [search, setSearch] = useState<string>("");
  const { data: movie, isLoading, isError } = useGetMovieById(movieId);
  const route = useRouter();
  //console.log("this is movie data", movie);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movie</p>;
  const handleAdmin = () => {
    route.push("/admin/dashboard");
  };
  return (
    <>
      <Header setSearch={setSearch} />
      {search ? (
        <h1> searchdata:{search}</h1>
      ) : (
        <div className="grid grid-cols-1 sm:flex flex-row gap-6">
          <div className="bg-white md:flex flex-col w-full rounded-xl shadow overflow-hidden">
            <button className="text-green-400" onClick={() => handleAdmin()}>
              Go To Admin
            </button>
            <div className=" md:flex pt-4">
              <div className="relative w-full h-40 md:h-100 md:w-1/2 lg:w-1/4 bg-gray-100 flex items-center justify-center">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="object-cover md:object-fill"
                  sizes="200vw"
                />
              </div>
              <div className="flex flex-col">
                <div className="px-4 pt-3">
                  <h3 className="text-lg font-semibold">Card Title</h3>
                  <p>{movie.name}</p>
                </div>
                <div className="px-4 pb-4 pt-1 md:pt-4">
                  <h3 className="text-lg font-semibold">Card Description</h3>
                  <p className="text-sm text-gray-600">{movie.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="px-4 pb-4 pt-1 flex justify-between">
                <p className="font-bold">
                  Reviews:
                  <span className="text-[14px] text-gray-300">
                    {" "}
                    {movie.reviews}k
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Rating:
                  <span className="text-[14px] text-gray-300">
                    {" "}
                    {movie.rating}/10
                  </span>{" "}
                </p>
              </div>
              <div className="px-4 pb-4 pt-1 flex justify-between">
                <p className="font-bold">
                  Created-At:{" "}
                  <span className="text-[14px] text-gray-300">
                    {" "}
                    {movie.createdAt}
                  </span>{" "}
                </p>
                <p className="font-bold">
                  Updated-At:{" "}
                  <span className="text-[14px] text-gray-300">
                    {" "}
                    {movie.updatedAt}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
