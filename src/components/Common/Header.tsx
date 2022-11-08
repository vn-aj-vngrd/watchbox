// components/Header.tsx

import { HomeIcon, MagnifyingGlassIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import router from "next/router";
import { useState } from "react";
import AvatarDropdown from "../Account/AvatarDropdown";
import ToggleTheme from "./ToggleTheme";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  const [showSearhBar, setShowSearchBar] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white py-2.5 dark:border-b dark:border-grayColor dark:bg-darkerColor">
      <div className="mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center space-x-1"
          >
            <SquaresPlusIcon className="mr-3 h-7 w-7 text-blue-600" />
            <h1 className="hidden items-center text-xl font-semibold text-black dark:text-white md:flex">
              WatchBox
            </h1>
          </button>

          {session && (
            <div className="flex items-center md:hidden">
              <button
                className="absolute z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-darkColor"
                onClick={() => {
                  setShowSearchBar(!showSearhBar);
                }}
              >
                <MagnifyingGlassIcon className="h-5 w-5 fill-gray-800 dark:fill-white" />
              </button>
              {showSearhBar && (
                <div className="absolute z-10 ml-2 transition-all duration-300 ease-in-out">
                  <input
                    type="text"
                    className="flex w-[165px] items-center rounded-lg border border-gray-100 bg-gray-50 p-2 pl-10 text-xs text-black placeholder-black outline-none dark:border-transparent dark:bg-grayColor dark:text-white dark:placeholder-white "
                    placeholder="Search WatchBox"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {session && (
          <>
            <div className="hidden items-center md:flex">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 fill-gray-800 dark:fill-white" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg bg-gray-100 p-2 pl-10 text-sm text-black placeholder-gray-500 outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-gray-300"
                  placeholder="Search WatchBox"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <div className="flex items-center justify-center space-x-5">
            {session ? (
              <>
                <div>
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className=" hidden h-9 w-9 items-center justify-center rounded-full bg-gray-100 focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor md:inline-flex"
                  >
                    <HomeIcon className="h-6 w-6 fill-gray-800 dark:fill-white" />
                  </button>
                </div>

                <div>{<ToggleTheme />}</div>

                <div>
                  <AvatarDropdown session={session} />
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
