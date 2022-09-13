// components/Header.tsx

import { HomeIcon, HeartIcon } from "@heroicons/react/24/solid";
import router, { useRouter } from "next/router";
import ToggleTheme from "./ToggleTheme";
import Account from "./Account";

const Header = () => {
  const path = useRouter().pathname;

  return (
    <header className="sticky top-0 z-10 py-4 bg-white border-b border-gray-200 shadow-sm dark:bg-black dark:border-[#525252]">
      <div className="flex flex-wrap items-center justify-between px-4 mx-auto ">
        <div>
          <button onClick={() => router.push("/")} className="hidden md:flex">
            <div className="flex items-center text-xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2 fill-blue-600"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              WatchBox
            </div>
          </button>

          <button onClick={() => router.push("/")} className="flex md:hidden">
            <div className="flex items-center text-base font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 mr-2 fill-blue-600"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              WatchBox
            </div>
          </button>
        </div>

        <div>
          <div className="flex items-center space-x-5 ">
            {path === "/" ? (
              <>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <HomeIcon
                      className="w-5 h-5"
                      onClick={() => router.push("/")}
                    />
                  </button>
                </div>

                <div>
                  <button
                    data-for="fav"
                    data-tip="Favorites"
                    type="button"
                    className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>

                <div>{<ToggleTheme />}</div>

                <div>
                  <Account />
                </div>
              </>
            ) : (
              <div>{<ToggleTheme />}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
