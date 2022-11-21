// Imports
import { useState, useEffect } from "react";
import { env } from "../../env/client.mjs";
import { Combobox } from "@headlessui/react";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Canvas = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const getPopularMovies = async () => {
    const req = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1&region=US`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    let { results } = req;
    results = results.slice(0, 10);
    setMovies(results);
    setTitle(results[0].original_title);
  };

  useEffect(() => {
    if (movies.length == 0) {
      getPopularMovies();
    }
  });

  const filteredMovies =
    title === ""
      ? movies.map((movie: Movie) => movie)
      : movies.filter((movie: Movie) => {
          return movie.original_title.toLowerCase().includes(title.toLowerCase());
        });

  return (
    <div>
      <div className="flex h-full select-none items-center justify-center text-sm text-gray-500 dark:text-neutral-400">
        Add your first entry
      </div>
      <Combobox value={title} onChange={setTitle}>
        <Combobox.Input onChange={(event) => setTitle(event.target.value)} />
        <Combobox.Options>
          {filteredMovies.map((movie: Movie) => (
            <Combobox.Option key={movie.id} value={movie.original_title}>
              {movie.original_title}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Canvas;
