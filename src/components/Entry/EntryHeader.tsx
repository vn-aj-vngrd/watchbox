import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const watchStatus = [
  { label: "Planned", color: "bg-gray-500" },
  { label: "Watching", color: "bg-blue-500" },
  { label: "On Hold", color: "bg-orange-500" },
  { label: "Watched", color: "bg-green-500" },
  { label: "Dropped", color: "bg-red-500" },
];

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
    <div className="mx-auto flex w-full max-w-7xl flex-row justify-between border-b border-gray-200 py-2.5 dark:border-grayColor md:py-4">
      <div className="flex md:hidden">
        <button onClick={() => router.push(`/box/${boxId}`)} className="inline-flex items-center">
          <ChevronLeftIcon className="mr-1 mt-0.5 h-4 w-4 fill-neutral-400" />
          Back
        </button>
      </div>
      <nav className="hidden md:flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <div className="flex items-center">
              <button
                onClick={() => router.push(`/box/${boxId}`)}
                className="text-md ml-1 font-medium text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-600 md:ml-2"
              >
                {getBoxTitle?.data?.boxTitle}
              </button>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronLeftIcon className="h-5 w-5 rotate-180 fill-neutral-400" />
              <span className="text-md ml-1 font-medium text-blue-600 md:ml-2">{entryTitle}</span>
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
              className="text-md inline-flex w-fit items-center justify-center rounded-md border border-transparent bg-gray-100 py-1 pl-1.5 pr-10 font-medium text-black shadow-sm dark:bg-darkColor dark:text-white"
              id="options-menu"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <div
                className={`${watchStatus[watchStatusIdx]?.color} mx-2 h-3 w-3 rounded-full`}
              ></div>
              {watchStatus[watchStatusIdx]?.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute right-2 h-5 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {isShowDropdown && (
              <div
                className="absolute right-0 z-20 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkColor"
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
                      className="text-md block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-grayColor"
                      role="menuitem"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryHeader;
