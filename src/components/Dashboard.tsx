import {
  ChevronLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Boxes from "./Boxes";

// XXX: temporary data; change this to db api call or whatever
const boxList = [
  { boxTitle: "Watched", boxEntriesCount: 13 },
  { boxTitle: "Watching", boxEntriesCount: 2 },
  { boxTitle: "On Hold", boxEntriesCount: 1 },
  { boxTitle: "Planned", boxEntriesCount: 3 },
  { boxTitle: "Dropped", boxEntriesCount: 6 },
  { boxTitle: "Watched", boxEntriesCount: 13 },
  { boxTitle: "Watching", boxEntriesCount: 2 },
  { boxTitle: "On Hold", boxEntriesCount: 1 },
  { boxTitle: "Planned", boxEntriesCount: 3 },
  { boxTitle: "Dropped", boxEntriesCount: 6 },
  { boxTitle: "Watched", boxEntriesCount: 13 },
  { boxTitle: "Watching", boxEntriesCount: 2 },
  { boxTitle: "On Hold", boxEntriesCount: 1 },
  { boxTitle: "Planned", boxEntriesCount: 3 },
  { boxTitle: "Dropped", boxEntriesCount: 6 },
];

const favList = [
  { boxEntriesCount: 13 },
  { boxEntriesCount: 2 },
  { boxEntriesCount: 1 },
  { boxEntriesCount: 3 },
  { boxEntriesCount: 6 },
];

const sortOptions = [
  { id: "one", name: "Newest" },
  { id: "two", name: "Oldest" },
  { id: "three", name: "A-Z" },
  { id: "four", name: "Z-A" },
];

const Dashboard = () => {
  const [boxes] = useState(boxList);
  const [faves] = useState(favList);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sortArr, setSortArr] = useState<boolean[]>([]);

  useEffect(() => {
    setSortArr(Array(sortOptions.length).fill(false));
  }, []);

  const onSort = (id: number) => {
    const newSortOptions = Array(sortOptions.length).fill(false);
    newSortOptions[id] = !newSortOptions[id];
    setSortArr(newSortOptions);
  };

  return (
    <div className="w-full py-6 space-y-12 ">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <div className="flex space-x-6">
          <button className="text-2xl subpixel-antialiased font-medium hover:text-blue-600">
            Boxes
          </button>
          <button className="text-2xl subpixel-antialiased font-normal hover:text-blue-600">
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
              <div className="absolute z-10 w-56 mt-2 bg-white border divide-y divide-gray-200 rounded-lg shadow-sm">
                <ul>
                  {sortOptions?.map((item, index) => (
                    <li key={index}>
                      <div className="px-4 py-2 hover:bg-gray-100">
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
                            <p className="text-sm font-medium text-gray-900 ">
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

      <Boxes boxes={boxes} />

      <nav className="flex justify-center">
        <ul className="inline-flex space-x-2">
          <li>
            <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </li>
          <li>
            <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white">
              1
            </button>
          </li>

          <li>
            <button className="px-3 py-2 leading-tight text-white bg-blue-600 border border-blue-600 ">
              2
            </button>
          </li>

          <li>
            <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
