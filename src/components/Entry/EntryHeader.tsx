import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const watchStatus = ["Planned", "Watching", "On Hold", "Watched", "Dropped"];

type Props = {
  boxId: string | undefined;
  entryId: string | undefined;
  entryTitle: string | undefined;
  status: number | undefined;
  refetch: () => void;
};

const EntryHeader = ({ boxId, entryId, entryTitle, refetch, status }: Props) => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [watchStatusIdx, setWatchStatusIdx] = useState<number>(status || 0);

  const router = useRouter();

  const updateStatus = trpc.useMutation("entry.updateStatus", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const showDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  const getBoxTitle = trpc.useQuery([
    "entry.getBoxTitle",
    {
      id: boxId as string,
    },
  ]);

  return (
    <div className="mx-auto flex h-12 w-full max-w-7xl justify-between border-b border-gray-200 py-10 dark:border-grayColor">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="flex items-center">
              <button
                onClick={() => router.push(`/box/${boxId}`)}
                className="text-md ml-1 font-medium text-gray-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-600 md:ml-2"
              >
                {getBoxTitle?.data?.boxTitle}
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-gray-400"
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
              <span className="text-md ml-1 font-medium text-gray-500 dark:text-white dark:hover:text-blue-600 md:ml-2">
                {entryTitle}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* Watch Status Dropdown List */}
      <div className="flex flex-row items-center justify-end">
        <div className="relative inline-block text-left">
          <div>
            <button
              onClick={showDropdown}
              type="button"
              className="text-md inline-flex w-full justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 font-medium text-gray-500 shadow-sm"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
            >
              {watchStatus[watchStatusIdx]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-6 pt-0.5 pl-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
          {isShowDropdown ? (
            <>
              <div
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  {watchStatus.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        updateStatus.mutateAsync({
                          id: entryId as string,
                          status: index,
                        });
                        setWatchStatusIdx(index);
                        setIsShowDropdown(false);
                      }}
                      className="text-md block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default EntryHeader;
