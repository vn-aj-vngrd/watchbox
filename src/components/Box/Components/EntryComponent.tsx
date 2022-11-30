import { Combobox } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import router from "next/router";
import { useState } from "react";
import { env } from "../../../env/client.mjs";
import { trpc } from "../../../utils/trpc";
import Spinner from "../../Common/Spinner";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  entryComponent: Component;
  shift: boolean;
  deleteComponent: (id: string) => void;
  refetch: () => void;
};

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

const EntryComponent = ({ entryComponent, shift, deleteComponent, refetch }: Props) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createEntry = trpc.useMutation("entry.createEntry");

  const searchMovies = async (title: string) => {
    const req = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=true`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    let { results } = req;
    results = results.slice(0, 10);
    setMovies(results);
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length > 0 ? await searchMovies(event.target.value) : setSelectedMovie(null);
  };

  const handleMovieSelect = async (movie: Movie) => {
    if (movie != null) {
      const { id, original_title, poster_path } = movie;
      await createEntry
        .mutateAsync({
          componentId: entryComponent.id,
          movieId: id.toString(),
          title: original_title,
          image: poster_path,
        })
        .then(() => {
          setSelectedMovie(movie);
          refetch();
        });
    }
  };

  return (
    <div
      onClick={
        entryComponent?.entry?.movieId && !shift
          ? () => router.push(`entry/${entryComponent?.entry?.componentId}`)
          : undefined
      }
      className={`absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor ${
        entryComponent?.entry?.movieId && !shift && "cursor-pointer"
      }`}
      style={{ top: entryComponent?.yAxis - 40, left: entryComponent?.xAxis - 144 }}
    >
      {shift && (
        <div className="absolute -right-3 -top-3 z-20">
          <button
            onClick={() => {
              if (!isLoading) deleteComponent(entryComponent.id);
              setIsLoading(true);
            }}
            className="rounded-full bg-gray-200 p-[6px] shadow-md outline-none dark:bg-darkColor"
          >
            <TrashIcon className="h-[18px] w-[18px] text-red-500" />
          </button>
        </div>
      )}
      <div className="pointer-events-none absolute h-full w-full overflow-hidden rounded-md">
        <div className="absolute -left-7 -top-7 text-neutral-700 opacity-5 dark:text-neutral-200">
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
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <>
          {isLoading || createEntry.isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <>
              {entryComponent?.entry?.movieId ? (
                entryComponent?.entry?.title
              ) : (
                // TODO: Load more results on scroll
                // TODO: If searchMovies returns no results, substring the query iteratively and search again
                <Combobox value={selectedMovie} onChange={handleMovieSelect} nullable>
                  <Combobox.Input
                    onChange={handleInputChange}
                    displayValue={(movie: Movie) => movie?.original_title ?? ""}
                    className="h-full w-full bg-transparent text-center placeholder-neutral-700 outline-none dark:placeholder-neutral-300"
                    placeholder="Search for a movie..."
                  />
                  <Combobox.Options className="absolute top-20 z-20 mt-1 max-h-64 w-full rounded-md bg-gray-200 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500 dark:bg-darkColor">
                    {movies.map((movie: Movie) => (
                      <Combobox.Option
                        key={movie.id}
                        value={movie}
                        className="y-2 rounded-md py-3 px-3 hover:cursor-pointer hover:bg-white hover:font-semibold hover:text-black active:bg-blue-500 active:text-white"
                      >
                        {movie.original_title +
                          " • " +
                          new Date(Date.parse(movie.release_date)).getFullYear()}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Combobox>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default EntryComponent;
