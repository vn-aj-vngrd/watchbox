// components/Favorites.tsx

import { MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

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
    <div className="w-full py-6 space-y-8">
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
            className="text-2xl subpixel-antialiased text-blue-600"
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
              className="inline-flex items-center px-4 py-3 text-sm font-normal text-center text-gray-600 bg-white border rounded-lg outline-none dark:bg-grayColor dark:border-grayColor dark:text-white"
              type="button"
            >
              Sort
              <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-600 dark:text-white" />
            </button>

            {openSort && (
              <div className="absolute z-10 w-56 mt-2 bg-white border divide-y divide-gray-200 rounded-lg shadow-sm dark:bg-grayColor dark:border-grayColor">
                <ul>
                  {sortOptions?.map((item, index) => (
                    <li key={index}>
                      <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-darkColor">
                        <div className="flex items-center space-x-4">
                          <div>
                            <input
                              id={item.id}
                              checked={sortArr[index]}
                              onChange={() => onSort(index)}
                              type="checkbox"
                              className="w-4 h-4"
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
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-white" />
              </div>
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                onChange={(e) => onSearch(e)}
                className="block w-full p-3 pl-10 text-sm placeholder-gray-600 bg-white border rounded-lg outline-none text-gray-800d dark:placeholder-white dark:bg-grayColor dark:border-grayColor dark:text-white"
                placeholder="Search Box"
              />
            </div>
          </div>
        </div>
      </div>

      {favoritesData.isLoading && <Spinner />}
      {favoritesData.data?.length === 0 && (
        <div className="flex items-center justify-center">No results found.</div>
      )}

      <div className="grid md:w-full w-[80%] gap-x-14 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-6 md:gap-y-8 mx-auto">
        {favoritesData.data?.map((fav, index) => (
          <button key={index} className="flex flex-col items-center group">
            <div
              className={`grid ${
                fav?.Entry.length > 1 ? "grid-cols-2 grid-rows-2" : "grid-cols-1"
              } gap-3 w-32 p-4 transition duration-150 ease-in-out bg-white-50 border dark:bg-grayColor rounded-lg dark:border-transparent shadow-sm lg:w-36 aspect-square hover:scale-105`}
            >
              {fav?.Entry?.length == 1 ? (
                <div key={index} className="overflow-hidden bg-white rounded-md">
                  <Image
                    className="object-cover"
                    src={fav?.Entry[0]?.image || ""}
                    alt=""
                    width="1080"
                    height="1080"
                    layout="responsive"
                  />
                </div>
              ) : (
                <>
                  {fav?.Entry?.slice(0, 4).map((item, index) => (
                    <div key={index} className="overflow-hidden bg-white rounded-md">
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
            <div className="p-2 text-center bg-transparent">
              <p className="subpixel-antialiased font-normal text-gray-600 dark:text-white">
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
          previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
          nextLabel={<ChevronRightIcon className="w-5 h-5" />}
          previousLinkClassName="block duration-300 ease-in-out py-1.5 px-2.5 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
          nextLinkClassName={
            "block py-1.5 px-2.5 duration-300 ease-in-out text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
          }
          className="flex space-x-2"
          pageLinkClassName="block py-1 px-2.5 text-gray-500 bg-white border border-gray-300 duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
          activeLinkClassName="bg-blue-600 border-blue-600 text-gray-50 duration-300 ease-in-out hover:bg-blue-600 hover:text-white  dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

export default Favorites;
