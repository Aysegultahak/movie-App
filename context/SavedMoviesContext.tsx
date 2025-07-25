import { getFavoriteMovies, removeFavoriteMovie, saveFavoriteMovie } from "@/services/appwrite";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Movie = {
  id: string;
  title: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
};

type SavedMoviesContextType = {
  savedMovies: Movie[];
  handleSave: (movie: Movie) => Promise<void>;
};

const SavedMoviesContext = createContext<SavedMoviesContextType>({
  savedMovies: [],
  handleSave: async () => {},
});

type Props = {
  children: ReactNode;
};

export const SavedMoviesProvider = ({ children }: Props) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getFavoriteMovies().then((docs) => {
      setSavedMovies(docs.map((doc: any) => ({
        id: String(doc.movie_id),           // Appwrite'da movie_id
        title: doc.title,
        poster_path: doc.poster_url,         // Appwrite'da poster_url
        vote_average: doc.vote_average,
        release_date: doc.release_date,
      })));
    });
  }, []);

const handleSave = async (movie: Movie) => {
  // Hem kodda hem Appwrite'da id integer ise Number ile karşılaştır
  const alreadySaved = savedMovies.some(m => Number(m.id) === Number(movie.id));
  if (alreadySaved) {
    await removeFavoriteMovie(movie.id); // movie.id burada string veya number olabilir
  } else {
    await saveFavoriteMovie(movie);
  }
  const docs = await getFavoriteMovies();
  setSavedMovies(docs.map((doc: any) => ({
    id: String(doc.movie_id),           // Appwrite'da movie_id integer ise string'e çevir
    title: doc.title,
    poster_path: doc.poster_url,
    vote_average: doc.vote_average,
    release_date: doc.release_date,
  })));
};

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, handleSave }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => useContext(SavedMoviesContext);