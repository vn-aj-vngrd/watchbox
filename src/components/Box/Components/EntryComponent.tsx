import { Combobox } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import router from "next/router";
import { useState } from "react";
import { env } from "../../../env/client.mjs";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import toast from "react-hot-toast";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { calculatePoint } from "../Helpers";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Props = {
  entryComponent: Component;
  removeEntry: (id: string) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  shift: boolean;
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
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

const EntryComponent = ({
  entryComponent,
  removeEntry,
  canvasRef,
  shift,
  setShift,
  refetch,
}: Props) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  let canvasRect: DOMRect | undefined;
  const snapTo = snap(10);

  const createEntry = trpc.useMutation("entry.createEntry");
  const deleteComponent = trpc.useMutation("component.deleteComponent");
  const updateComponent = trpc.useMutation("component.updateComponent");

  const bind = useLongPress(
    () => {
      setShift(!shift);
    },
    {
      detect: LongPressDetectEvents.TOUCH,
    },
  );

  const removeComponent = async (id: string) => {
    removeEntry(id);
    await deleteComponent.mutateAsync({
      id: id,
    });
    // .then(() => {
    //   refetch();
    // });
  };

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

  // FIXME: Cursor pointer messes up after creating new component
  const handleMovieSelect = async (movie: Movie) => {
    if (movie != null) {
      const { id, original_title, poster_path } = movie;
      await createEntry
        .mutateAsync({
          componentId: entryComponent.id,
          movieId: id.toString(),
          title: original_title,
          image: poster_path ?? "",
        })
        .catch(() => {
          toast.error("Error");
          setSelectedMovie(null);
          refetch();
        })
        .then(() => {
          setSelectedMovie(movie);
          refetch();
        });
    }
  };

  const updateEntryComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      await updateComponent.mutateAsync({
        id: entryComponent.id,
        xAxis: snapTo(
          calculatePoint(
            canvasRect.x,
            canvasRef.current.scrollLeft,
            info.point.x,
            144,
            288,
            116,
            0,
          ),
        ),
        yAxis: snapTo(
          calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 40, 80, 40, 0),
        ),
      });
    }
  };

  return (
    <motion.div
      drag={shift}
      dragMomentum={false}
      onDrag={() => {
        if (canvasRect == null) canvasRect = canvasRef.current?.getBoundingClientRect();
      }}
      onDragEnd={(e, info) => {
        updateEntryComponent(info);
      }}
      {...bind()}
      onClick={
        entryComponent?.entry?.movieId && !shift
          ? () => router.push(`entry/${entryComponent?.entry?.componentId}`)
          : undefined
      }
      className={`${
        shift && "outline-2 hover:cursor-move hover:outline hover:outline-blue-500"
      } absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor ${
        entryComponent?.entry && !shift && "cursor-pointer"
      }`}
      style={{ top: entryComponent?.yAxis - 40, left: entryComponent?.xAxis - 144 }}
    >
      {shift && (
        <div className="absolute -right-3 -top-3 z-20">
          <button
            onClick={() => {
              if (!deleteComponent.isLoading) removeComponent(entryComponent.id);
            }}
            className="rounded-full bg-gray-200 p-[6px] shadow-md shadow-gray-300 outline-none dark:bg-darkColor dark:shadow-black/20"
          >
            <TrashIcon className="h-[18px] w-[18px] text-red-500" />
          </button>
        </div>
      )}
      {/* TODO: Add movie image when movie is selected */}
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
          {deleteComponent.isLoading || createEntry.isLoading ? (
            <div role="status">
              <svg
                className="inline h-6 w-6 animate-spin fill-blue-600 text-gray-300 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
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
    </motion.div>
  );
};

export default EntryComponent;
