import Image from "next/image";
import { StarIcon, PencilIcon, NewspaperIcon, EyeIcon } from "@heroicons/react/24/solid";
import { env } from "../../env/client.mjs";
import { useEffect, useState, useCallback } from "react";

type Props = {
  triggerRating: () => void;
  triggerReview: () => void;
  triggerNotes: () => void;
  isStared: boolean;
  isReviewed: boolean;
  isNoted: boolean;
  movieId: string | undefined;
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

const Metadata = ({
  triggerRating,
  triggerReview,
  triggerNotes,
  isStared,
  isReviewed,
  isNoted,
  movieId,
}: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProvider, setWatchProvider] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [date, setDate] = useState<string>("");

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
    const { PH } = req.results;
    const link = PH?.link;
    setWatchProvider(link);
  }, [movieId]);

  useEffect(() => {
    if (movie === null) {
      getDetails();
      getWatchProviders();
    } else {
      if (minutes === 0) {
        const { runtime } = movie;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        setHours(hours);
        setMinutes(minutes);
      }

      if (date === "") {
        setDate(new Date(Date.parse(movie?.release_date)).getFullYear().toString());
      }
    }
  }, [date, getDetails, getWatchProviders, minutes, movie]);

  return (
    <div className="flex flex-col items-center py-4 md:flex-row md:items-start md:p-4 md:px-4">
      <div className="relative flex h-[260px] w-[173px] shrink-0 rounded-md p-4 px-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]">
        {/* TODO: Add image loader */}
        <Image
          className="rounded-md"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
          layout="fill"
        />
      </div>
      <div className="flex md:ml-2 md:px-4 md:pt-4">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mt-4 flex flex-row text-3xl font-bold sm:text-4xl md:mt-0 md:text-4xl lg:text-4xl xl:text-4xl">
            {movie?.title}
          </h3>
          <div className="mt-2 inline-flex items-center space-x-2 text-sm">
            <div className="relative h-7 w-7">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                layout="fill"
              />
            </div>
            <p>
              {" "}
              {date} • {(hours != 0 ? hours + "h " : "") + minutes + "m"} •{" "}
              {movie?.genres.map((genre: Genre, index) =>
                index < movie?.genres.length - 1 ? " " + genre.name + "," : " " + genre.name,
              )}
            </p>
          </div>
          <p className="mt-2 pr-2 text-justify text-sm md:text-start">{movie?.overview}</p>
          <div className="mt-5 flex space-x-6 text-center">
            <div>
              <button
                onClick={triggerRating}
                className={`inline-flex items-center rounded py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8
                ${
                  isStared
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }
                `}
              >
                <StarIcon
                  className={`h-5 w-5 dark:text-white ${isStared ? "text-white" : "text-gray-800"}`}
                />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">
                {isStared ? "Remove Rating" : "Add Rating"}
              </p>
            </div>
            <div>
              <button
                onClick={triggerReview}
                className={`inline-flex items-center rounded  py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8 ${
                  isReviewed
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <PencilIcon
                  className={`h-5 w-5 dark:text-white ${
                    isReviewed ? "text-white" : "text-gray-800"
                  }`}
                />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">
                {isReviewed ? "Remove Review" : "Add Review"}
              </p>
            </div>
            <div>
              <button
                onClick={triggerNotes}
                className={`inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800  dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8 ${
                  isNoted
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <NewspaperIcon
                  className={`h-5 w-5 dark:text-white ${isNoted ? "text-white" : "text-gray-800"}`}
                />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">
                {isNoted ? "Remove Note" : "Add Note"}
              </p>
            </div>
            <div className={`${watchProvider ? "hover:cursor-pointer" : "opacity-50"}`}>
              <a
                href={watchProvider || ""}
                target={"_blank"}
                rel={"noreferrer"}
                className={`${!watchProvider && "pointer-events-none"}`}
              >
                <div className="inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8">
                  <EyeIcon className="h-5 w-5 dark:text-white" />
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
