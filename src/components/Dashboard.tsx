import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Boxes from "./Boxes";
import Favorites from "./Favorites";
import Pagination from "./Pagination";

// XXX: temporary data; change this to db api call or whatever
const boxList = [
  { boxTitle: "Watched1", boxEntriesCount: 13 },
  { boxTitle: "Watching2", boxEntriesCount: 2 },
  { boxTitle: "On Hold3", boxEntriesCount: 1 },
  { boxTitle: "Planned4", boxEntriesCount: 3 },
  { boxTitle: "Dropped5", boxEntriesCount: 6 },
  { boxTitle: "Watched6", boxEntriesCount: 13 },
  { boxTitle: "Watching7", boxEntriesCount: 2 },
  { boxTitle: "On Hold8", boxEntriesCount: 1 },
  { boxTitle: "Planned9", boxEntriesCount: 3 },
  { boxTitle: "Dropped10", boxEntriesCount: 6 },
  { boxTitle: "Watched11", boxEntriesCount: 13 },
  { boxTitle: "Watching12", boxEntriesCount: 2 },
  { boxTitle: "On Hold13", boxEntriesCount: 1 },
  { boxTitle: "Planned14", boxEntriesCount: 3 },
  { boxTitle: "Dropped15", boxEntriesCount: 6 },
  { boxTitle: "Watched16", boxEntriesCount: 13 },
  { boxTitle: "Watching17", boxEntriesCount: 2 },
  { boxTitle: "On Hold18", boxEntriesCount: 1 },
  { boxTitle: "Planned19", boxEntriesCount: 3 },
  { boxTitle: "Dropped20", boxEntriesCount: 6 },
  { boxTitle: "Watched21", boxEntriesCount: 13 },
  { boxTitle: "Watching22", boxEntriesCount: 2 },
  { boxTitle: "On Hold23", boxEntriesCount: 1 },
  { boxTitle: "Planned24", boxEntriesCount: 3 },
  { boxTitle: "Dropped25", boxEntriesCount: 6 },
  { boxTitle: "Watched26", boxEntriesCount: 13 },
  { boxTitle: "Watching27", boxEntriesCount: 2 },
  { boxTitle: "On Hold28", boxEntriesCount: 1 },
  { boxTitle: "Planned29", boxEntriesCount: 3 },
  { boxTitle: "Dropped30", boxEntriesCount: 6 },
];

const favList = [
  { favoriteTitle: "My Fav 1", favoriteEntriesCount: 13 },
  { favoriteTitle: "My Fav 2", favoriteEntriesCount: 2 },
  { favoriteTitle: "My Fav 3", favoriteEntriesCount: 1 },
  { favoriteTitle: "My Fav 4", favoriteEntriesCount: 3 },
  { favoriteTitle: "My Fav 5", favoriteEntriesCount: 6 },
];

const sortOptions = [
  { id: "one", name: "Newest" },
  { id: "two", name: "Oldest" },
  { id: "three", name: "A-Z" },
  { id: "four", name: "Z-A" },
];

const Dashboard = () => {
  const [collection, setCollection] = useState("boxes");
  const [boxes] = useState(boxList);
  const [faves] = useState(favList);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sortArr, setSortArr] = useState<boolean[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setSortArr(Array(sortOptions.length).fill(false));
  }, []);

  const onSort = (id: number) => {
    const newSortOptions = Array(sortOptions.length).fill(false);
    newSortOptions[id] = !newSortOptions[id];
    setSortArr(newSortOptions);
  };

  
  return (
    <div className="w-full py-6 space-y-8">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <div className="flex space-x-6">
          <button 
            onClick={() => setCollection("boxes")} 
            className={`text-2xl subpixel-antialiased hover:text-blue-600 ${collection === "boxes" ? "font-medium" : "font-normal"}`}>
            Boxes {pageIndex}
          </button>
          <button 
            onClick={() => setCollection("favorites")} 
            className={`text-2xl subpixel-antialiased hover:text-blue-600 ${collection === "favorites" ? "font-medium" : "font-normal"}`}>
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
                // onChange={(e) => onSearch(e.target.value)}
                className="block w-full p-3 pl-10 text-sm placeholder-gray-600 bg-white border rounded-lg outline-none text-gray-800d dark:placeholder-white dark:bg-grayColor dark:border-grayColor dark:text-white"
                placeholder="Search Box"
              />
            </div>
          </div>
        </div>
      </div>

      {
        collection === "boxes" ? 
          <Boxes pageIndex={pageIndex} boxes={boxes} setPageCount={setPageCount} /> : 
          <Favorites pageIndex={pageIndex} favorites={faves} />
      }

      <Pagination pageCount={pageCount} pageIndex={pageIndex} setPageIndex={setPageIndex}  />

    </div>
  );
};

export default Dashboard;
