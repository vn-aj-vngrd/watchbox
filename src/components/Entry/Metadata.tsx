import { StarIcon, PencilIcon, NewspaperIcon, EyeIcon } from "@heroicons/react/24/solid";

type Props = {
  triggerReview: () => void;
  triggerNotes: () => void;
  isReviewed: boolean;
  isNoted: boolean;
};

const Metadata = ({ triggerReview, triggerNotes, isReviewed, isNoted }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-row p-4 px-4">
      <div className="flex h-[260px] w-[173px] shrink-0 grow rounded-lg bg-gray-500 p-4 px-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]"></div>
      <div className="ml-2 flex grow px-4 pt-4">
        <div className="flex flex-col">
          <b>
            <p className="flex flex-row text-lg">West Side Story</p>
          </b>
          <p className="mt-2 inline-flex text-sm">
            <svg className="h-5 w-9 pt-[5px]">
              <image
                className="w-7"
                href="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
              ></image>
            </svg>
            2021 ⚬ 2h 36m ⚬ Musical, Drama
          </p>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum fringilla nulla et
            sagittis. Aliquam vestibulum dignissim sagittis. Etiam a varius eros. Vivamus dictum,
            nisl vel volutpat commodo, quam tortor facilisis mi, at suscipit dui erat sed lectus.
            Nulla libero lectus, vestibulum eu vehicula sagittis, lobortis non nisi. Duis nulla
            mauris, scelerisque non feugiat non, convallis a ante. Praesent vel ante a nibh posuere
            aliquam in in sapien.
          </p>
          <div className="mt-5 flex flex-row space-x-5 text-center">
            <div>
              <button
                onClick={triggerReview}
                className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor"
              >
                <StarIcon
                  className={`h-5 w-5 ${isReviewed ? "text-yellow-500" : "text-gray-500"}`}
                />
              </button>
              <p className="pt-1 pl-0.5 text-xs">{isReviewed ? "Edit Rating" : "Add Rating"}</p>
            </div>
            <div>
              <button
                onClick={triggerReview}
                className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor"
              >
                <PencilIcon className={`h-5 w-5 ${isReviewed ? "text-black" : "text-gray-500"}`} />
              </button>
              <p className="pt-1 pl-0.5 text-xs">{isReviewed ? "Edit Review" : "Add Review"}</p>
            </div>
            <div>
              <button
                onClick={triggerNotes}
                className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor"
              >
                <NewspaperIcon
                  className={`h-5 w-5 ${isNoted ? "text-blue-600" : "text-gray-500"}`}
                />
              </button>
              <p className="pt-1.5 pl-1.5 text-xs">{isNoted ? "Edit Note" : "Add Note"}</p>
            </div>
            <div>
              <button className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-500 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor">
                <EyeIcon className="h-5 w-5 dark:text-white" />
              </button>
              <p className="pt-1 pl-1.5 text-xs ">Watch Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
