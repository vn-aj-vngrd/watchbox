// components/Dashboard.tsx

import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Boxes from "./Boxes";
import Favorites from "./Favorites";
import ReactPaginate from 'react-paginate';
import { trpc } from "../utils/trpc";

// XXX: temporary data; change this to db api call or whatever

type BoxList = {
    boxTitle: string;
}

// const boxList = [
//   { boxTitle: "Watched1", boxEntriesCount: 13 },
//   { boxTitle: "Watching2", boxEntriesCount: 2 },
//   { boxTitle: "On Hold3", boxEntriesCount: 1 },
//   { boxTitle: "Planned4", boxEntriesCount: 3 },
//   { boxTitle: "Dropped5", boxEntriesCount: 6 },
//   { boxTitle: "Watched6", boxEntriesCount: 13 },
//   { boxTitle: "Watching7", boxEntriesCount: 2 },
//   { boxTitle: "On Hold8", boxEntriesCount: 1 },
//   { boxTitle: "Planned9", boxEntriesCount: 3 },
//   { boxTitle: "Dropped10", boxEntriesCount: 6 },
//   { boxTitle: "Watched11", boxEntriesCount: 13 },
//   { boxTitle: "Watching12", boxEntriesCount: 2 },
//   { boxTitle: "On Hold13", boxEntriesCount: 1 },
//   { boxTitle: "Planned14", boxEntriesCount: 3 },
//   { boxTitle: "Dropped15", boxEntriesCount: 6 },
//   { boxTitle: "Watched16", boxEntriesCount: 13 },
//   { boxTitle: "Watching17", boxEntriesCount: 2 },
//   { boxTitle: "On Hold18", boxEntriesCount: 1 },
//   { boxTitle: "Planned19", boxEntriesCount: 3 },
//   { boxTitle: "Dropped20", boxEntriesCount: 6 },
//   { boxTitle: "Watched21", boxEntriesCount: 13 },
//   { boxTitle: "Watching22", boxEntriesCount: 2 },
//   { boxTitle: "On Hold23", boxEntriesCount: 1 },
//   { boxTitle: "Planned24", boxEntriesCount: 3 },
//   { boxTitle: "Dropped25", boxEntriesCount: 6 },
//   { boxTitle: "Watched26", boxEntriesCount: 13 },
//   { boxTitle: "Watching27", boxEntriesCount: 2 },
//   { boxTitle: "On Hold28", boxEntriesCount: 1 },
//   { boxTitle: "Planned29", boxEntriesCount: 3 },
//   { boxTitle: "Dropped30", boxEntriesCount: 6 },
// ];

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

const itemsPerPage = 14;

const Dashboard = () => {
  const [currentItems, setCurrentItems] = useState<BoxList[]>([]);
  const [collection, setCollection] = useState("boxes");
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [sortArr, setSortArr] = useState<boolean[]>([]);
  const [paginationNumber, setpaginationNumber] = useState(0);

  const boxesData = trpc.useQuery(["box.getBoxes", {skip:paginationNumber, take:itemsPerPage}]);
  const boxesCount = trpc.useQuery(["box.getPageCount"]);

  console.log(boxesData.data);
  
  // useEffect(() => {
  //    setSortArr(Array(sortOptions.length).fill(false));
  //    setCurrentItems(boxList);
  //   }, [boxList]);

   const onSort = (id: number) => {
     const newSortOptions = Array(sortOptions.length).fill(false);
     newSortOptions[id] = !newSortOptions[id];
     setSortArr(newSortOptions);
   };

  const handlePageClick = (event:{selected:number}) => {
    setpaginationNumber(event.selected);
  };
  
  return (
    <div className="w-full py-6 space-y-8">
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row">
        <div className="flex space-x-6">
          <button 
            onClick={() => setCollection("boxes")} 
            className={`text-2xl subpixel-antialiased hover:text-blue-600 ${collection === "boxes" ? "font-medium" : "font-normal"}`}>
            Boxes 
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
          <Boxes boxes={boxesData.data} /> : <></>
          // <Favorites favorites={faves} />
      }

        <div className="flex justify-center">
            <ReactPaginate
              breakLabel="..."
              onPageChange={handlePageClick}
              pageRangeDisplayed={itemsPerPage}
              pageCount={boxesCount?.data !== undefined ? Math.ceil(boxesCount.data/itemsPerPage) : 0}
              previousLabel={
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
              nextLabel={
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
              previousLinkClassName="block duration-300 ease-in-out py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              nextLinkClassName={
                "block py-2 px-3 duration-300 ease-in-out text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }
              className="flex space-x-2"
              pageLinkClassName="block py-2 px-3 text-gray-500 bg-white border border-gray-300 duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700"
              activeLinkClassName="bg-[#6A74CF] border-[#6A74CF] text-gray-50 font-bold duration-300 ease-in-out hover:bg-primaryColor hover:text-gray-50 hover:border-[#6A74CF]"
            />
          </div>

    </div>
  );
};

export default Dashboard;
