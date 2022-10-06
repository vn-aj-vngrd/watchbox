import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  pageCount: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
};

// https://swr.vercel.app/docs/pagination

const Pagination: React.FC<Props> = ({
  pageCount,
  pageIndex,
  setPageIndex,
}) => {
  return (
    <nav className="flex justify-center">
      {pageCount}
      <ul className="inline-flex space-x-2">
        <li>
          <button
            onClick={() => (pageIndex > 1 ? setPageIndex(pageIndex - 1) : null)}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>

        {Array.from(Array(pageCount).keys()).map((index) => (
          <li key={index}>
            <button
              onClick={() => setPageIndex(1)}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white"
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* <li>
            <button onClick={() => setPageIndex(1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white">
              1
            </button>
          </li>

          <li>
            <button onClick={() => setPageIndex(2)} className="px-3 py-2 leading-tight text-white bg-blue-600 border border-blue-600 ">
              2
            </button>
          </li> */}

        <li>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
