const Dashboard = () => {
  return (
    <div className="flex-row justify-start text-center">
      <div className="flex-grow-1 flex items-center flex-col">
        <div className="text-2xl font-semibold p-2">
          <h1>Boxes</h1>
        </div>

        <div className="h-44">
          <div className="flex items-center">
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>

            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 flex items-center flex-col">
        <div className="text-2xl font-semibold p-2">
          <h1>Favorites</h1>
        </div>
        <div className="h-44">
          <div className="flex items-center">
            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>
            <button className="w-32 h-32 bg-white rounded-md border border-gray-200 shadow-md m-3"></button>

            <button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button className="fixed z-90 bottom-12 right-8 bg-white w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="blue"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;
