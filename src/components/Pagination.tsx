import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
};

// https://swr.vercel.app/docs/pagination

// const Pagination: React.FC<Props> = ({
//   pageCount,
//   pageIndex,
//   setPageIndex,
// }) => {


//   return (
//     <div
//         className={
//           Math.ceil(
//             (boxesTotalCount.data && boxesTotalCount.data / itemsPerPage) || 0
//           ) > 0 &&
//           Math.ceil(
//             (boxesData.data && boxesData.data.length / itemsPerPage) || 0
//           ) > 0 &&
//           !boxesData.isLoading
//             ? "flex justify-center"
//             : "hidden"
//         }
//       >
//     <ReactPaginate
//           breakLabel="..."
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={itemsPerPage}
//           pageCount={
//             searchParam
//               ? Math.ceil(
//                   (favoritesData.data &&
//                     favoritesData.data?.length / itemsPerPage) ||
//                     0
//                 )
//               : Math.ceil(
//                   (favoritesTotalCount.data &&
//                     favoritesTotalCount.data / itemsPerPage) ||
//                     0
//                 )
//           }
//           previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
//           nextLabel={<ChevronRightIcon className="w-5 h-5" />}
//           previousLinkClassName="block duration-300 ease-in-out py-1.5 px-2.5 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
//           nextLinkClassName={
//             "block py-1.5 px-2.5 duration-300 ease-in-out text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
//           }
//           className="flex space-x-2"
//           pageLinkClassName="block py-1 px-2.5 text-gray-500 bg-white border border-gray-300 duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-700 hover:text-gray-700 dark:bg-grayColor dark:border-grayColor dark:text-white dark:hover:bg-darkColor"
//           activeLinkClassName="bg-blue-600 border-blue-600 text-gray-50 duration-300 ease-in-out hover:bg-blue-600 hover:text-white  dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600"
//         />
//       </div>
//   );
// };

// export default Pagination;
