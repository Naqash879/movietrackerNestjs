"use client";
import { useGetMovies } from "../admin/hooks/admin.hooks";
import Header from "../header/header";
import { useState } from "react";
import { TMovie } from "../admin/schemas/admin.schema";
import Link from "next/link";
export default function Main() {
  const [search, setSearch] = useState<string>("");
  const { data, isError, error, isPending } = useGetMovies();

  if (isPending) return <p>loading ...</p>;
  if (isError) return <p>{error?.message}</p>;
  const filteredData = data.filter((m: TMovie) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <Header setSearch={setSearch} />
      {search ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.length === 0 ? (
            <div>
              <h1>result of this {search} is not found</h1>
            </div>
          ) : (
            filteredData.map((movie: TMovie, index: number) => (
              <Link href={`moviedetail/${movie._id}`} key={index}>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="object-cover"
                      sizes="200vw"
                    />
                  </div>

                  <div className="px-4 pt-3">
                    <h3 className="text-lg font-semibold">{movie.name}</h3>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <p className="text-sm text-gray-600">{movie.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.length === 0 ? (
            <div>
              <h1>Movie Not found</h1>
            </div>
          ) : (
            data.map((movie: TMovie, index: number) => (
              <Link href={`moviedetail/${movie._id}`} key={index}>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="object-cover"
                      sizes="200vw"
                    />
                  </div>

                  <div className="px-4 pt-3">
                    <h3 className="text-lg font-semibold">{movie.name}</h3>
                  </div>
                  <div className="px-4 pb-4 pt-1">
                    <p className="text-sm text-gray-600">{movie.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}
