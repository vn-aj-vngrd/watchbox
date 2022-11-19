import { FavoriteBox } from "@prisma/client";
import { useState } from "react";
import { boxRouter } from "../../server/router/box";
import Components from "../Box/Components";
import Controls from "../Box/Controls";
import Header from "../Box/Header";
import { StarIcon, NewspaperIcon, EyeIcon } from "@heroicons/react/24/solid";

type Props = {
  box:
    | {
        id: string;
        username: string | null;
        boxes: { id: string; created_at: Date; updated_at: Date; boxTitle: string }[];
      }
    | null
    | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
  refetch: () => void;
};

const EntryPage = (/*{ box, favoriteBox, id, refetch }: Props*/) => {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full grow flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-row p-4 px-4">
          <div className="flex h-[260px] w-[173px] shrink-0 grow rounded-lg bg-gray-500 p-4 px-4 sm:h-[280px] sm:w-[186px] md:h-[300px] md:w-[200px] lg:h-[320px] lg:w-[213px]"></div>
          <div className="ml-2 flex grow px-4 pt-4">
            <div className="flex flex-col">
              <b>
                <p className="text-lg">West Side Story</p>
              </b>
              <p className="mt-2 text-sm">2021 ⚬ 2h 36m ⚬ Musical, Drama</p>
              <p className="mt-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum fringilla
                nulla et sagittis. Aliquam vestibulum dignissim sagittis. Etiam a varius eros.
                Vivamus dictum, nisl vel volutpat commodo, quam tortor facilisis mi, at suscipit dui
                erat sed lectus. Nulla libero lectus, vestibulum eu vehicula sagittis, lobortis non
                nisi. Duis nulla mauris, scelerisque non feugiat non, convallis a ante. Praesent vel
                ante a nibh posuere aliquam in in sapien.
              </p>
              <div className="mt-5 flex flex-row">
                <div className="mr-5">
                  <button className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                  </button>
                  <p className="pt-1 pl-0.5 text-xs">Add a Review</p>
                </div>
                <div className="mr-5">
                  <button className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor">
                    <NewspaperIcon className="h-5 w-5 dark:text-white" />
                  </button>
                  <p className="pt-1.5 pl-1.5 text-xs">Add a Note</p>
                </div>
                <div className="mr-5">
                  <button className="inline-flex items-center rounded bg-gray-100 py-2 px-7 font-bold text-gray-800 hover:bg-gray-200 dark:bg-darkColor dark:hover:bg-grayColor">
                    <EyeIcon className="h-5 w-5 dark:text-white" />
                  </button>
                  <p className="pt-1 pl-1.5 text-xs ">Watch Now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-row ">
          <div className="sm:ml-30 md:ml-50 mx-auto flex max-w-7xl grow flex-col px-4 pt-1 lg:ml-60 xl:ml-60">
            <hr></hr>
            <p className="pt-3.5 text-sm">My Review</p>
            <div className="-ml-[2px] flex items-center py-2">
              <button className="h-5 w-5 text-gray-300 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400">
                <StarIcon />
              </button>
              <button className="h-5 w-5 text-gray-300 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400">
                <StarIcon />
              </button>
              <button className="h-5 w-5 text-gray-300 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400">
                <StarIcon />
              </button>
              <button className="h-5 w-5 text-gray-300 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400">
                <StarIcon />
              </button>
              <button className="h-5 w-5 text-gray-300 hover:text-yellow-400 dark:text-gray-500 dark:hover:text-yellow-400">
                <StarIcon />
              </button>
            </div>
            <form className="pt-1">
              <div className="mb-4 w-full rounded-lg bg-gray-100 pt-1 dark:border-darkColor dark:bg-darkColor">
                <div className="rounded-t-lg bg-gray-100 px-4 py-2 dark:bg-darkColor">
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full bg-gray-100 px-1 py-1 text-sm focus:ring-0 dark:bg-darkColor dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a review..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between border-t px-3 py-2 dark:border-darkColor">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4 focus:ring-blue-200 hover:bg-blue-700 dark:focus:ring-blue-900"
                  >
                    Save Review
                  </button>
                </div>
              </div>
            </form>
            <hr></hr>
            <p className="py-2 text-sm">My Notes</p>
            <form className="pt-1">
              <div className="mb-4 w-full rounded-lg bg-gray-100 pt-1 dark:border-darkColor dark:bg-darkColor">
                <div className="rounded-t-lg bg-gray-100 px-4 py-2 dark:bg-darkColor">
                  <textarea
                    id="comment"
                    rows={4}
                    className="w-full bg-gray-100 px-1 py-1 text-sm focus:ring-0 dark:bg-darkColor dark:text-white dark:placeholder-gray-400"
                    placeholder="Write a review..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-between border-t px-3 py-2 dark:border-darkColor">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-lg bg-blue-600 py-2.5 px-4 text-center text-xs font-medium text-white focus:ring-4 focus:ring-blue-200 hover:bg-blue-700 dark:focus:ring-blue-900"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
