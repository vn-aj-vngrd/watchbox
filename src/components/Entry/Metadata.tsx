import Image from "next/image";
import { env } from "../../env/client.mjs";
import { useEffect, useState, useCallback } from "react";
import { Rating as StarRating } from "react-simple-star-rating";
import { trpc } from "../../utils/trpc";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Icon } from "@iconify/react";
import movieLine from "@iconify/icons-mingcute/movie-line";
import starFill from "@iconify/icons-mingcute/star-fill";
import pencilFill from "@iconify/icons-mingcute/pencil-fill";
import bookmarkFill from "@iconify/icons-mingcute/bookmark-fill";
import eye2Fill from "@iconify/icons-mingcute/eye-2-fill";
import roundFill from "@iconify/icons-mingcute/round-fill";

type Props = {
  entryId: string | undefined;
  movieId: string | undefined;
  review: string | null | undefined;
  note: string | null | undefined;
  rating: number | undefined;
};

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  genres: Genre[];
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

const fillColorArray = [
  "#FF1B6B",
  "#FF1B6B",
  "#CF4991",
  "#CF4991",
  "#A372B4",
  "#A372B4",
  "#749EDA",
  "#749EDA",
  "#45CAFF",
  "#45CAFF",
];

const Metadata = ({ entryId, movieId, review, note, rating = 0 }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProvider, setWatchProvider] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (movie?.overview) setShowMore(movie.overview.length < 350);
  }, [movie]);

  const updateRating = trpc.useMutation("entry.updateRating", {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const handleOnClick = (currentRating: number) => {
    setCurrentRating(currentRating);
    updateRating.mutateAsync({
      id: entryId as string,
      rating: currentRating,
    });
  };

  const getDetails = useCallback(async () => {
    const req = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    setMovie(req);
  }, [movieId]);

  const getWatchProviders = useCallback(async () => {
    const req = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    const link = req.results?.PH?.link;
    setWatchProvider(link);
  }, [movieId]);

  useEffect(() => {
    if (!movie) {
      getDetails();
      getWatchProviders();
      return;
    }
    const { runtime } = movie;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    setHours(hours);
    setMinutes(minutes);
    setDate(new Date(Date.parse(movie?.release_date)).getFullYear().toString());
  }, [date, getDetails, getWatchProviders, minutes, movie]);

  return (
    <div className="flex flex-col items-center py-4 md:flex-row md:items-start">
      <div className="relative flex h-[260px] w-[173px] shrink-0 rounded-md p-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]">
        {movie?.poster_path ? (
          <Image
            draggable={false}
            className="rounded-md"
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
            layout="fill"
            alt={movie?.title}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-gray-200 dark:bg-darkColor dark:text-neutral-500">
            <Icon icon={movieLine} width="96" />
          </div>
        )}
      </div>
      <div className="flex md:ml-4 md:px-4 md:pt-4">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mt-4 flex select-text flex-row text-3xl font-bold sm:text-4xl md:mt-0 md:text-4xl lg:text-4xl xl:text-4xl">
            {movie?.title}
          </h3>
          <div className="mt-2 inline-flex items-center space-x-2 text-sm">
            <div className="relative h-7 w-7">
              <Image
                draggable={false}
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                layout="fill"
                alt="TMDB"
              />
            </div>
            <p className="select-text">
              {date} • {(hours != 0 ? hours + "h " : "") + minutes + "m"} •
              {movie?.genres?.map((genre: Genre, index) =>
                index < movie?.genres.length - 1 ? " " + genre.name + "," : " " + genre.name,
              )}
            </p>
          </div>
          <p className="mt-2 select-text pr-2 text-justify text-sm md:text-start">
            {movie?.overview && movie?.overview.length > 350 ? (
              <>
                {showMore ? movie?.overview + " " : movie?.overview.substring(0, 350) + "... "}
                <span
                  className="cursor-pointer select-none text-blue-500"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "show less" : "show more"}
                </span>
              </>
            ) : (
              movie?.overview
            )}
          </p>
          <div className="group flex items-center justify-center gap-2 py-4">
            <StarRating
              className="-ml-0.5 mb-1"
              allowHover={true}
              onClick={handleOnClick}
              initialValue={currentRating}
              allowFraction={true}
              onPointerEnter={() => setHovering(true)}
              onPointerLeave={() => setHovering(false)}
              fillIcon={<Icon icon={starFill} className="mx-0.5 inline-block h-6 w-6" />}
              emptyIcon={
                !hovering && currentRating === 0 ? (
                  <Icon
                    icon={roundFill}
                    width="6"
                    className="mx-[11px] inline-block h-6 text-gray-200 dark:text-neutral-500"
                  />
                ) : (
                  <Icon
                    icon={starFill}
                    className="mx-0.5 inline-block h-6 w-6 text-gray-200 dark:text-neutral-500"
                  />
                )
              }
              size={32}
              fillColorArray={fillColorArray}
            />
            {currentRating !== 0 && (
              <button
                className="invisible mr-2 h-full group-hover:visible"
                onClick={() => {
                  handleOnClick(0);
                }}
              >
                <XMarkIcon className="h-5 w-5 text-red-500" />
              </button>
            )}
          </div>
          <div className="mt-1 flex space-x-6 text-center">
            <div>
              <button
                className={`${
                  review ? "text-white" : "text-gray-800"
                } inline-flex items-center rounded py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8 ${
                  review
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Icon icon={pencilFill} className="h-5 w-5 dark:text-white" />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">
                {review ? "Remove Review" : "Add Review"}
              </p>
            </div>
            <div>
              <button
                className={`inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800  dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8 ${
                  note
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Icon
                  icon={bookmarkFill}
                  className={`h-5 w-5 dark:text-white ${note ? "text-white" : "text-gray-800"}`}
                />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">{note ? "Remove Note" : "Add Note"}</p>
            </div>
            <div className={`${watchProvider ? "hover:cursor-pointer" : "opacity-50"}`}>
              <a
                href={watchProvider || ""}
                target={"_blank"}
                rel={"noreferrer"}
                className={`${!watchProvider && "pointer-events-none"}`}
              >
                <div className="inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8">
                  <Icon icon={eye2Fill} width="20" className="h-5 w-5 dark:text-white" />
                </div>
              </a>
              <p className="hidden pt-1.5 text-xs md:block">Watch Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
