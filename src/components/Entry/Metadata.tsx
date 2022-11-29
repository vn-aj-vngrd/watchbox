import Image from "next/image";
import { BookmarkIcon, EyeIcon } from "@heroicons/react/24/solid";
import { env } from "../../env/client.mjs";
import { useEffect, useState, useCallback } from "react";
import { Rating as StarRating } from "react-simple-star-rating";
import { trpc } from "../../utils/trpc";
import StarCircleComponent from "./StarCircleComponent";

type Props = {
  triggerReview: () => void;
  triggerNotes: () => void;
  isReviewed: boolean;
  isNoted: boolean;
  movieId: string | undefined;
  rating: number | undefined;
  entryId: string | undefined;
  refetch: () => void;
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
  triggerReview,
  triggerNotes,
  isReviewed,
  isNoted,
  movieId,
  rating,
  entryId,
  refetch,
}: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProvider, setWatchProvider] = useState<string | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating || 0);

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

  const updateRating = trpc.useMutation("entry.updateRating", {
    onSuccess: () => {
      refetch();
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
    <div className="flex flex-col items-center py-4 md:flex-row md:items-start">
      <div className="relative flex h-[260px] w-[173px] shrink-0 rounded-md p-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]">
        {/* TODO: Add image loader */}
        <Image
          className="rounded-md"
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie?.poster_path}`}
          layout="fill"
          alt={movie?.title}
        />
      </div>
      <div className="flex md:ml-4 md:px-4 md:pt-4">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mt-4 flex select-text flex-row text-3xl font-bold sm:text-4xl md:mt-0 md:text-4xl lg:text-4xl xl:text-4xl">
            {movie?.title}
          </h3>
          <div className="mt-2 inline-flex items-center space-x-2 text-sm">
            <div className="relative h-7 w-7">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                layout="fill"
                alt="TMDB Logo"
              />
            </div>
            <p className="select-text">
              {date} • {(hours != 0 ? hours + "h " : "") + minutes + "m"} •
              {movie?.genres.map((genre: Genre, index) =>
                index < movie?.genres.length - 1 ? " " + genre.name + "," : " " + genre.name,
              )}
            </p>
          </div>
          <p className="mt-2 select-text pr-2 text-justify text-sm md:text-start">
            {movie?.overview}
          </p>
          <StarRating
            allowHover={true}
            onClick={handleOnClick}
            initialValue={currentRating}
            allowFraction={true}
            className="my-2"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            SVGclassName={`inline-block h-8`}
            emptyIcon={!hovering && currentRating === 0 ? <StarCircleComponent /> : ""}
            size={32}
            fillColorArray={fillColorArray}
          />
          <div className="mt-1 flex space-x-6 text-center">
            <div>
              <button
                onClick={triggerReview}
                className={`dark:text-white ${
                  isReviewed ? "text-white" : "text-gray-800"
                } inline-flex items-center rounded  py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-8 ${
                  isReviewed
                    ? "bg-blue-600 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-800"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="M20.131 3.16a3 3 0 0 0-4.242 0l-.707.708l4.95 4.95l.706-.707a3 3 0 0 0 0-4.243l-.707-.707Zm-1.414 7.072l-4.95-4.95l-9.09 9.091a1.5 1.5 0 0 0-.401.724l-1.029 4.455a1 1 0 0 0 1.2 1.2l4.456-1.028a1.5 1.5 0 0 0 .723-.401l9.091-9.091Z"
                    />
                  </g>
                </svg>
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
                <BookmarkIcon
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
