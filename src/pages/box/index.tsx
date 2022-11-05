import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// https://icon-sets.iconify.design/mingcute/

const account = () => {
  return (
    <>
      <Meta title="WatchBox | Box" />

      <div className="flex h-full w-full border-t border-b dark:border-darkColor">
        <div className="flex h-full w-72 flex-col border-r dark:border-darkColor">
          {/* Controls */}
          <div className="flex h-12 items-center justify-center gap-x-3 border-b dark:border-darkColor">
            <button className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-grayColor dark:text-white dark:hover:bg-darkColor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M13 2.5a5.5 5.5 0 0 1 4.213 9.036a5.5 5.5 0 0 1-2.992 9.96L14 21.5H6.1a1.6 1.6 0 0 1-1.593-1.454L4.5 19.9V4.1a1.6 1.6 0 0 1 1.454-1.593L6.1 2.5H13Zm1 11H7.5v5H14a2.5 2.5 0 0 0 0-5Zm-1-8H7.5v5H13a2.5 2.5 0 0 0 0-5Z"
                  />
                </g>
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-grayColor dark:text-white dark:hover:bg-darkColor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M16 2.5h-6a1.5 1.5 0 0 0 0 3h1.3l-1.624 13H8a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3h-1.3l1.624-13H16a1.5 1.5 0 0 0 0-3Z"
                  />
                </g>
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-grayColor dark:text-white dark:hover:bg-darkColor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M18 18.5a1.5 1.5 0 0 1 .144 2.993L18 21.5H6a1.5 1.5 0 0 1-.144-2.993L6 18.5h12Zm-1-16a1.5 1.5 0 0 1 1.493 1.356L18.5 4v7a6.5 6.5 0 0 1-12.996.233L5.5 11V4a1.5 1.5 0 0 1 2.993-.144L8.5 4v7a3.5 3.5 0 0 0 6.995.192L15.5 11V4A1.5 1.5 0 0 1 17 2.5Z"
                  />
                </g>
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-grayColor dark:text-white dark:hover:bg-darkColor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M14 17.5a1.5 1.5 0 0 1 .144 2.993L14 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5h10Zm6-5a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3h16Zm-6-5a1.5 1.5 0 0 1 .144 2.993L14 10.5H4a1.5 1.5 0 0 1-.144-2.993L4 7.5h10Zm6-5a1.5 1.5 0 0 1 .144 2.993L20 5.5H4a1.5 1.5 0 0 1-.144-2.993L4 2.5h16Z"
                  />
                </g>
              </svg>
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border font-bold focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-grayColor dark:text-white dark:hover:bg-darkColor">
              <ChevronLeftIcon className="h-4 w-4 fill-black dark:fill-white" />
            </button>
          </div>
          {/* Left pane */}
          <div className="h-full">Left pane</div>
        </div>

        <div className="flex h-full grow flex-col">
          {/* Top bar */}
          <div className="h-12 border-b dark:border-darkColor">Top bar</div>
          {/* Canvas */}
          <div className="h-full">Canvas</div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSideSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default account;
