"use client";

import { createContext, useContext, PropsWithChildren, useState } from "react";
import { TMovie } from "@/module/admin/schemas/admin.schema";

type MovieContextType = {
  selectedMovie: TMovie | null;
  setSelectedMovie: (movie: TMovie | null) => void;
};

const MovieContext = createContext<MovieContextType | null>(null);

export const MovieProvider = ({ children }: PropsWithChildren) => {
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);
  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error("useMovieContext must be used within MovieProvider");
  return context;
};
