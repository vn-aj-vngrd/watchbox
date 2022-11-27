import Image from "next/image";
import { StarIcon, PencilIcon, NewspaperIcon, EyeIcon } from "@heroicons/react/24/solid";

type Props = {
  triggerRating: () => void;
  triggerReview: () => void;
  triggerNotes: () => void;
  isStared: boolean;
  isReviewed: boolean;
  isNoted: boolean;
};

const Metadata = ({
  triggerRating,
  triggerReview,
  triggerNotes,
  isStared,
  isReviewed,
  isNoted,
}: Props) => {
  return (
    <div className="mx-auto flex flex-col items-center py-4 md:flex-row md:items-start md:p-4 md:px-4">
      <div className="relative flex h-[260px] w-[173px] shrink-0 grow rounded-md p-4 px-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]">
        <Image
          className="rounded-md"
          src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3Ib8vlWTrAKRrTWUrTrZPOMW4jp.jpg"
          layout="fill"
        />
      </div>
      <div className="flex md:ml-2 md:px-4 md:pt-4">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mt-4 flex flex-row text-3xl font-bold sm:text-4xl md:mt-0 md:text-4xl lg:text-4xl xl:text-4xl">
            West Side Story
          </h3>
          <div className="mt-2 inline-flex items-center space-x-2 text-sm">
            <div className="relative h-7 w-7">
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                layout="fill"
              />
            </div>
            <p> 2021 ⚬ 2h 36m ⚬ Musical, Drama</p>
          </div>
          <p className="mt-2 pr-2 text-justify text-sm md:text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum fringilla nulla et
            sagittis. Aliquam vestibulum dignissim sagittis. Etiam a varius eros. Vivamus dictum,
            nisl vel volutpat commodo, quam tortor facilisis mi, at suscipit dui erat sed lectus.
            Nulla libero lectus, vestibulum eu vehicula sagittis, lobortis non nisi. Duis nulla
            mauris, scelerisque non feugiat non, convallis a ante. Praesent vel ante a nibh posuere
            aliquam in in sapien.
          </p>
          <div className="mt-5 flex space-x-6 text-center">
            <div>
              <button
                onClick={triggerRating}
                className={`inline-flex items-center rounded py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-7
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
                className={`inline-flex items-center rounded  py-2 px-4 font-bold text-gray-800 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-7 ${
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
                className={`inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800  dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-7 ${
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
            <div>
              <button className="inline-flex items-center rounded bg-gray-100 py-2 px-4 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor md:py-4 md:px-7">
                <EyeIcon className="h-5 w-5 dark:text-white" />
              </button>
              <p className="hidden pt-1.5 text-xs md:block">Watch Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
