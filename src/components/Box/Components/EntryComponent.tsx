import { Combobox } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import router from "next/router";
import { useState } from "react";
import { env } from "../../../env/client.mjs";
import { trpc } from "../../../utils/trpc";
import { useLongPress, LongPressDetectEvents } from "use-long-press";
import { motion, PanInfo } from "framer-motion";
import { snap } from "popmotion";
import { calculatePoint, resetCanvasSize } from "../Helpers";
import { Icon } from "@iconify/react";
import movieLine from "@iconify/icons-mingcute/movie-line";
import Image from "next/image.js";

type Component = Prisma.ComponentGetPayload<{
  include: { text: true; entry: true; divider: true };
}>;

type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const watchStatus = [
  { color: "bg-gray-500" },
  { color: "bg-blue-500" },
  { color: "bg-orange-500" },
  { color: "bg-green-500" },
  { color: "bg-red-500" },
];

type Props = {
  entryComponent: Component;
  removeStateComponent: (id: string) => Promise<void>;
  updateStateComponent: (component: Component) => Promise<void>;
  canvasRef: React.RefObject<HTMLDivElement>;
  canvasSizeRef: React.RefObject<HTMLDivElement>;
  shift: boolean;
  temp: string[];
  setShift: React.Dispatch<React.SetStateAction<boolean>>;
  setTemp: React.Dispatch<React.SetStateAction<string[]>>;
};

const EntryComponent = ({
  entryComponent,
  removeStateComponent,
  updateStateComponent,
  canvasRef,
  canvasSizeRef,
  shift,
  temp,
  setShift,
  setTemp,
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

  const searchMovies = async (title: string) => {
    const req = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=true`,
      { method: "GET" },
    ).then((res) => res.json());
    let { results } = req;
    results = results.slice(0, 10);
    setMovies(results);
  };

  const removeComponent = async (id: string) => {
    setTemp((prev) => [...prev, entryComponent.id]);

    removeStateComponent(id).then(() => {
      resetCanvasSize(canvasSizeRef, canvasRef);
    });

    await deleteComponent
      .mutateAsync({
        id: id,
      })
      .then(() => {
        setTemp((prev) => prev.filter((item) => item !== entryComponent.id));
      });
  };

  const updateEntryComponent = async (info: PanInfo) => {
    if (
      canvasRef.current &&
      canvasRect?.x &&
      info.point.x - (canvasRect?.x ?? 0) > 0 &&
      info.point.y - (canvasRect?.y ?? 0) > 0
    ) {
      setTemp((prev) => [...prev, entryComponent.id]);

      updateStateComponent(
        Object.assign(entryComponent, {
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 144, 288, 116),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 40, 80, 40),
          ),
        }),
      ).then(() => {
        resetCanvasSize(canvasSizeRef, canvasRef);
      });

      await updateComponent
        .mutateAsync({
          id: entryComponent.id,
          xAxis: snapTo(
            calculatePoint(canvasRect.x, canvasRef.current.scrollLeft, info.point.x, 144, 288, 116),
          ),
          yAxis: snapTo(
            calculatePoint(canvasRect.y, canvasRef.current.scrollTop, info.point.y, 40, 80, 40),
          ),
        })
        .then(() => {
          setTemp((prev) => prev.filter((item) => item !== entryComponent.id));
        });
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.length > 0 ? await searchMovies(event.target.value) : setSelectedMovie(null);
  };

  const handleMovieSelect = async (movie: Movie) => {
    if (!movie) return;

    const { id, original_title, poster_path } = movie;

    setTemp((prev) => [...prev, entryComponent.id]);

    updateStateComponent(
      Object.assign(entryComponent, {
        entry: {
          componentId: entryComponent.id,
          movieId: id.toString(),
          image: poster_path ?? "",
          title: original_title,
          note: null,
          review: null,
          status: 0,
          rating: 0,
        },
      }),
    );

    await createEntry
      .mutateAsync({
        componentId: entryComponent.id,
        movieId: id.toString(),
        image: poster_path ?? "",
        title: original_title,
      })
      .then((res) => {
        updateStateComponent(
          Object.assign(entryComponent, {
            entry: {
              ...entryComponent.entry,
              id: res.id,
              created_at: res.created_at,
              updated_at: res.updated_at,
            },
          }),
        );
      })
      .then(() => {
        setTemp((prev) => prev.filter((item) => item !== entryComponent.id));
      });
  };

  return (
    <motion.div
      drag={shift && !temp.includes(entryComponent.id.startsWith("tmp-") ? entryComponent.id : "")}
      dragMomentum={false}
      dragSnapToOrigin
      dragElastic={0}
      dragConstraints={canvasRef}
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
        shift && "outline-2 hover:outline hover:outline-blue-500"
      } absolute flex h-20 w-72 items-center justify-center rounded-md bg-gray-200 text-sm dark:bg-darkColor`}
      style={{ top: entryComponent?.yAxis - 40, left: entryComponent?.xAxis - 144 }}
    >
      {shift && (
        <button
          disabled={!shift || temp.includes(entryComponent.id)}
          onClick={() => {
            removeComponent(entryComponent.id);
          }}
          className="group absolute -right-3 -top-3 z-20 rounded-full bg-gray-200 p-1.5 shadow-md shadow-gray-300 outline-none dark:bg-darkColor dark:shadow-black/20"
        >
          <TrashIcon className="h-4 w-4 text-red-500 group-disabled:opacity-50" />
        </button>
      )}
      {entryComponent.entry?.image && entryComponent?.entry?.image !== "" ? (
        <>
          <div
            className={`rounded-r-0 absolute left-0 h-full w-full rounded-l-md ${
              shift && "hover:cursor-move"
            } ${entryComponent?.entry && !shift && "hover:cursor-pointer"}`}
          />
          <div className="rounded-r-0 pointer-events-none aspect-square h-full overflow-hidden rounded-l-md">
            <Image
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${entryComponent.entry.image}`}
              alt=""
              width="1080"
              height="1080"
              layout="responsive"
              className="pointer-events-none bg-darkColor object-cover"
              draggable={false}
            />
          </div>
        </>
      ) : (
        <div className="pointer-events-none absolute h-full w-full overflow-hidden rounded-md">
          <div className="absolute -left-7 -top-7 text-neutral-700 opacity-5 dark:text-neutral-200">
            <Icon icon={movieLine} width="104" />
          </div>
        </div>
      )}
      <div
        className={`flex h-full grow items-center justify-center ${shift && "hover:cursor-move"} ${
          entryComponent?.entry && !shift && "hover:cursor-pointer"
        }`}
      >
        <>
          {entryComponent?.entry?.movieId ? (
            entryComponent?.entry?.title
          ) : (
            // TODO: Load more results on scroll
            // TODO: If searchMovies returns no results, substring the query iteratively and search again
            <Combobox disabled={shift} value={selectedMovie} onChange={handleMovieSelect} nullable>
              <Combobox.Input
                onChange={handleInputChange}
                displayValue={(movie: Movie) => movie?.original_title ?? ""}
                // disabled={shift}
                className={`h-full w-full bg-transparent text-center placeholder-neutral-700 outline-none dark:placeholder-neutral-300 ${
                  shift && "hover:cursor-move"
                }`}
                placeholder="Search for a movie..."
              />
              <div className="absolute top-20 z-20 mt-1 max-h-64 w-full overflow-hidden rounded-md bg-gray-200 dark:bg-darkColor">
                <Combobox.Options className="max-h-64 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-blue-500">
                  {movies.map((movie: Movie) => (
                    <Combobox.Option
                      key={movie.id}
                      value={movie}
                      className="y-2 rounded-md px-3 py-3 hover:cursor-pointer hover:bg-gray-300 active:bg-blue-500 active:text-white dark:hover:bg-neutral-600"
                    >
                      {movie.original_title +
                        " • " +
                        new Date(Date.parse(movie.release_date)).getFullYear()}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          )}
        </>
      </div>
      {entryComponent?.entry && (
        <div
          className={`pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 rounded-full ${
            watchStatus[entryComponent.entry.status]?.color
          }`}
        />
      )}
    </motion.div>
  );
};

export default EntryComponent;
