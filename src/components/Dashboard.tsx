import { useListState } from "@mantine/hooks";
import { ChevronLeftIcon, ChevronRightIcon, CubeIcon, HeartIcon } from "@heroicons/react/24/solid";

// XXX: temporary data; change this to db api call or whatever
const boxList = [
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
    <div className="flex-row justify-start text-center">
      <div className="flex-grow-1 flex items-center flex-col">
        <div>
          <div className="text-2xl font-semibold p-2 flex items-center">
            <CubeIcon className="h-5 w-5 text-blue-600" />

            <h1 className="p-2">Boxes</h1>
          </div>

          <div className="flex items-center">
            <button className="">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {
              boxes.map((box, index) => (
                <button key={index} className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3">
                  {box.boxTitle} ({box.boxEntriesCount})
                </button>
              ))
            }

            <button className="">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 flex items-center flex-col">
        <div>
          <div className="text-2xl font-semibold p-2 flex items-center">
            <HeartIcon className="h-5 w-5 text-blue-600" />

            <h1 className="p-2">Favorites</h1>
          </div>

          <div className="flex items-center">
            <button className="">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {
              faves.map((fav, index) => (
                <button key={index} className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3">
                  {fav.boxEntriesCount}
                </button>
              ))
            }

            <button className="">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <button className="fixed z-90 bottom-12 right-8 bg-white w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl">
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Dashboard;
