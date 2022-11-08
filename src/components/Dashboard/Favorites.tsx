// components/Favorites.tsx

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import router from "next/router";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";

const sortOptions = [
  { id: "one", name: "Newest" },
  { id: "two", name: "Oldest" },
  { id: "three", name: "A-Z" },
  { id: "four", name: "Z-A" },
];

const itemsPerPage = 21;

type FavoritesProps = {
  setMode: (mode: "boxes" | "favorites") => void;
};

const Favorites: React.FC<FavoritesProps> = ({ setMode }) => {
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sortArr, setSortArr] = useState<boolean[]>([true, false, false, false]);
  const [sortIndex, setSortIndex] = useState(0);
  const [searchParam, setSearchParam] = useState<string | null>();
  const [skip, setSkip] = useState(0);

  const favoritesData = trpc.useQuery([
    "favorite.getFavorites",
    {
      skip: skip,
      take: itemsPerPage,
      searchParam: searchParam,
      sortParam: sortOptions[sortIndex]?.name || "Newest",
    },
  ]);
  const favoritesTotalCount = trpc.useQuery(["favorite.getFavoritesCount"]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearchParam(null);
      return;
    }

    console.log(e.target.value);
    setSearchParam(e.target.value);
  };

  const onSort = (id: number) => {
    const newSortOptions = Array(sortOptions.length).fill(false);
    newSortOptions[id] = !newSortOptions[id];
    setSortArr(newSortOptions);
    setSortIndex(id);
  };

  const handlePageClick = (event: { selected: number }) => {
    setSkip(event.selected * itemsPerPage);
  };

  return (
    <div className="w-full space-y-8 py-6">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <div className="flex space-x-6">
          <button
            onClick={() => setMode("boxes")}
            className="text-2xl subpixel-antialiased duration-300 ease-in-out hover:text-blue-600"
          >
            Boxes
          </button>
          <button
            onClick={() => setMode("favorites")}
            className="text-2xl text-blue-600 subpixel-antialiased"
          >
            Favorites
          </button>
        </div>

        <div className="flex space-x-6">
          <div>
            <button
              onClick={() => {
                setOpenSort(!openSort);
              }}
              className="inline-flex items-center rounded-lg border border-gray-100 bg-white p-3 text-center text-sm font-normal text-gray-600 outline-none dark:border-transparent dark:bg-darkColor dark:text-white"
              type="button"
            >
              Sort
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-600 dark:text-white" />
            </button>

            {openSort && (
              <div className="absolute z-10 mt-2 w-56 divide-y divide-gray-200 rounded-lg border border-gray-100 bg-white shadow-sm dark:border-transparent dark:bg-darkColor">
                <ul>
                  {sortOptions?.map((item, index) => (
                    <li key={index}>
                      <div className="px-4 py-2">
                        <div className="flex items-center space-x-4">
                          <div>
                            <input
                              id={item.id}
                              checked={sortArr[index]}
                              onChange={() => onSort(index)}
                              type="checkbox"
                              className="h-4 w-4 cursor-pointer"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-white">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-white" />
              </div>
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                onChange={(e) => onSearch(e)}
                className="text-gray-800d block w-full rounded-lg border border-gray-100 bg-white p-3 pl-10 text-sm placeholder-gray-600 outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-white"
                placeholder="Search Box"
              />
            </div>
          </div>
        </div>
      </div>

      {favoritesData.isLoading && <Spinner />}
      {favoritesData.data?.length === 0 && (
        <div className="text-center">
          <h3 className="mt-2 font-medium text-black dark:text-white">No Boxes Found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
            Get started by clicking the heart icon in the box.
          </p>
        </div>
      )}

      <div className="mx-auto grid w-[80%] grid-cols-2 gap-x-14 gap-y-6 sm:grid-cols-3 md:w-full md:grid-cols-4 md:gap-y-8 lg:grid-cols-5 xl:grid-cols-7">
        {favoritesData.data?.map((fav, index) => (
          <button
            key={index}
            onClick={() => router.push(`/box/${fav.id}`)}
            className="group flex flex-col items-center"
          >
            <div
              className={`grid ${
                fav?.entries.length > 1 ? "grid-cols-2 grid-rows-2" : "grid-cols-1"
              } bg-white-50 aspect-square w-32 gap-3 rounded-lg border border-gray-100 bg-white p-4 transition duration-150 ease-in-out group-hover:scale-105 dark:border-transparent dark:bg-darkColor lg:w-36`}
            >
              {fav?.entries?.length == 1 ? (
                <div key={index} className="overflow-hidden rounded-md bg-white">
                  <Image
                    className="object-cover"
                    src={fav?.entries[0]?.image || ""}
                    alt=""
                    width="1080"
                    height="1080"
                    layout="responsive"
                  />
                </div>
              ) : (
                <>
                  {fav?.entries?.slice(0, 4).map((item, index) => (
                    <div key={index} className="overflow-hidden rounded-md bg-white">
                      <Image
                        className="object-cover"
                        src={item.image || ""}
                        alt=""
                        width="1080"
                        height="1080"
                        layout="responsive"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="bg-transparent p-2 text-center">
              <p className="font-normal text-gray-600 subpixel-antialiased dark:text-white">
                {fav?.boxTitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div
        className={
          Math.ceil((favoritesTotalCount.data && favoritesTotalCount.data / itemsPerPage) || 0) >
            0 &&
          Math.ceil((favoritesData.data && favoritesData.data.length / itemsPerPage) || 0) > 0 &&
          !favoritesData.isLoading
            ? "flex justify-center"
            : "hidden"
        }
      >
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={
            searchParam
              ? Math.ceil((favoritesData.data && favoritesData.data?.length / itemsPerPage) || 0)
              : Math.ceil(
                  (favoritesTotalCount.data && favoritesTotalCount.data / itemsPerPage) || 0,
                )
          }
          previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
          nextLabel={<ChevronRightIcon className="h-5 w-5" />}
          previousLinkClassName="block duration-300 ease-in-out py-1.5 px-2.5 text-gray-500 bg-white rounded-l-lg border border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-darkColor dark:border-transparent dark:text-white dark:hover:bg-darkColor"
          nextLinkClassName={
            "block py-1.5 px-2.5 duration-300 ease-in-out text-gray-500 bg-white rounded-r-lg border border-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:bg-darkColor dark:border-transparent dark:text-white dark:hover:bg-darkColor"
          }
          className="flex space-x-2"
          pageLinkClassName="block py-1 px-2.5 text-gray-500 bg-white border border-gray-100 duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700 dark:bg-darkColor dark:border-transparent dark:text-white dark:hover:bg-darkColor"
          activeLinkClassName="bg-blue-600 border-blue-600 text-gray-50 duration-300 ease-in-out hover:bg-blue-600 hover:text-white  dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Favorites;
