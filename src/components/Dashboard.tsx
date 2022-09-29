const Dashboard = () => {
  return (
    <div className="flex-row justify-start text-center">
      <div className="flex-grow-1 flex items-center flex-col">
        <div>
          <div className="text-2xl font-semibold p-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2463E8"
              className="w-5 h-5"
            >
              <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
            </svg>

            <h1>Boxes</h1>
          </div>

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
        <div>
          <div className="text-2xl font-semibold p-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2463E8"
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>

            <h1>Favorites</h1>
          </div>

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
