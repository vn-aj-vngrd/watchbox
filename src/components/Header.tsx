// components/Header.tsx

import { HomeIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import router, { useRouter } from "next/router";
import ToggleTheme from "./ToggleTheme";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

const Header = () => {
  const path = useRouter().pathname;
  const [tooltip, showTooltip] = useState(true);

  return (
    <header className="sticky top-0 z-50 py-4 bg-white border-b border-gray-200 shadow-sm dark:bg-black dark:border-[#525252]">
      <div className="container flex flex-wrap justify-between items-center mx-auto px-4">
        <div>
          <button onClick={() => router.push("/")} className="hidden md:flex">
            <div className="text-xl font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-blue-600 dark:fill-blue-500 mr-2"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              WatchBox
            </div>
          </button>

          <button onClick={() => router.push("/")} className="flex md:hidden">
            <div className="text-base font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-blue-600 dark:fill-blue-500 mr-2"
              >
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              WatchBox
            </div>
          </button>
        </div>

        <div>
          <div className=" flex items-center space-x-5">
            {path === "/" && (
              <>
                <div>
                  {tooltip && (
                    <ReactTooltip id="home" effect="float" place="bottom" />
                  )}
                  <button
                    data-for="home"
                    data-tip="Home"
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 50);
                    }}
                    type="button"
                    className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <HomeIcon
                      className="h-5"
                      onClick={() => router.push("/")}
                    />
                  </button>
                </div>

                <div>
                  {tooltip && (
                    <ReactTooltip id="heart" effect="float" place="bottom" />
                  )}
                  <button
                    data-for="heart"
                    data-tip="Favorites"
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 50);
                    }}
                    type="button"
                    className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <HeartIcon className="h-5" />
                  </button>
                </div>

                <div>
                  {tooltip && (
                    <ReactTooltip id="avatar" effect="float" place="bottom" />
                  )}
                  <button
                    data-for="avatar"
                    data-tip="Account"
                    onMouseLeave={() => {
                      showTooltip(false);
                      setTimeout(() => showTooltip(true), 50);
                    }}
                    type="button"
                    className="inline-flex items-center p-1 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <UserIcon className="h-5" />
                  </button>
                </div>
              </>
            )}

            <div className="ml-5">{<ToggleTheme isButton={true} />}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
