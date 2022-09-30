import { ChevronLeftIcon, ChevronRightIcon, CubeIcon, HeartIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
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

            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>

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

            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>

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
