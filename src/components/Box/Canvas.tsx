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
import router from "next/router";

type CanvasElement = {
  component: string;
  x: number;
  y: number;
};

type Props = {
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasElements: CanvasElement[];
};

const Canvas: React.FC<Props> = ({ canvasRef, canvasElements }) => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();

  const escape = (str: string) => {
    return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
  };

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
    setSelectedMovie(results[0]);
  };

  const searchMovies = async () => {
    const req = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=true`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    const { results } = req;
    setMovies(results);
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
          return movie.original_title.toLowerCase().includes(escape(title.trim().toLowerCase()));
        });

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    title.length > 0 ? searchMovies() : setSelectedMovie(null);
  };

  return (
    <div>
      // TODO: add right and bottom padding to canvas
    <div
      ref={canvasRef}
      className="relative flex h-full select-none items-center justify-center scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500"
    >
      {canvasElements.length === 0 ? (
        <span className="text-sm text-gray-500 dark:text-neutral-400">Add your first entry</span>
        ) : (
        canvasElements.map((canvasElement, index) => {
          switch (canvasElement.component) {
            case "text":
              return (
                <div
                  key={index}
                  className="absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 144 }}
                >
                  <div className="flex h-full w-full items-center justify-center text-neutral-700 dark:text-neutral-300">
                    Text Component
                  </div>
                </div>
              );
            case "entry":
              return (
                <div
                  // onClick={() => router.push(`/${}`)}
                  key={index}
                  className="absolute flex h-20 w-72 items-center justify-center overflow-hidden rounded-md bg-gray-200 text-sm dark:bg-darkColor"
                  style={{ top: canvasElement.y - 40, left: canvasElement.x - 144 }}
                >
                  <div className="pointer-events-none absolute -left-6 -top-6 text-neutral-700 opacity-5 dark:text-neutral-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="104"
                      height="104"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                        <path
                          fill="currentColor"
                          d="M12 2c5.523 0 10 4.477 10 10a9.982 9.982 0 0 1-3.76 7.814l-.239.186H20a1 1 0 0 1 .117 1.993L20 22h-8C6.477 22 2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm0 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm8 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="flex h-full w-full items-center justify-center">
                    <input
                      className="h-full w-full bg-transparent text-center placeholder-neutral-700 outline-none dark:placeholder-neutral-300"
                      placeholder="Search a movie"
                    />
                  </div>
                </div>
              );
          }
        })
      )}
      </div>
      <Combobox value={selectedMovie} onChange={setSelectedMovie} nullable>
        <Combobox.Input
          onChange={handleInputChange}
          displayValue={(movie: Movie) => movie?.original_title ?? title}
        />
        <Combobox.Options>
          {filteredMovies.map((movie: Movie) => (
            <Combobox.Option key={movie.id} value={movie}>
              {movie.original_title}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default Canvas;
