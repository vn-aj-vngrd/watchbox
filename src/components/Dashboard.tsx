import { useListState } from "@mantine/hooks";
import { ChevronLeftIcon, PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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

const Dashboard = () => {

  const [boxes, handleBoxes] = useListState(boxList);
  const [faves, handleFaves] = useListState(favList);

  return (


    <div className="mx-auto w-full lg:w-8/12 px-6 sm:px-8 md:px-12">

      <div className="flex justify-between items-center">
        <div className="flex space-x-6">
          <button className="text-2xl font-medium subpixel-antialiased">Boxes</button>
          <button className="text-2xl font-normal subpixel-antialiased">Favorites</button>
        </div>

        <div className="flex space-x-6">
          <div className="">
            <button className="flex items-center w-full p-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400">
              Sort
              <ChevronLeftIcon className="w-4 h-4 ml-2 -rotate-90" />
            </button>
          </div>
          <div className="flex items-center">
            <MagnifyingGlassIcon className="ml-2 w-5 h-5 absolute" />
            <input
              type="text"
              placeholder="Search Boxes"
              className="block w-full p-2 pl-8 placeholder-black border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkColor dark:focus:border-blue-500 dark:focus:ring-blue-400" />
          </div>
        </div>

      </div>

      <div className="my-10 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-8 place-content-between">
        {
          boxes.slice(0, 10).map((box, index) => (
            <button key={index} className="flex flex-col items-center group">
              <div className="w-32 lg:w-36 aspect-square bg-blue-500 rounded-lg shadow-sm hover:scale-105 transition ease-in-out duration-150">
              </div>
              <div className="p-2 text-center bg-transparent">
                <p className="font-normal subpixel-antialiased">Lorem Impsum</p>
              </div>
            </button>
          ))
        }
      </div>

      <div className="flex place-content-center h-10">
        <nav className="flex items-center">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a href="#" className="flex py-2 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="w-4 h-5" />
              </a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#" className="py-2 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
              <a href="#" aria-current="page" className="py-2 px-3 text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
              <a href="#" className="flex py-2 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <ChevronLeftIcon className="w-4 h-5 rotate-180" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>

  );
};

export default Dashboard;
