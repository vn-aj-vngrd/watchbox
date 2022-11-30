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
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-5 dark:border-grayColor dark:bg-darkerColor">
      <div className="flex space-x-2">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center space-x-1"
        >
          <SquaresPlusIcon className="mr-3 h-7 w-7 text-blue-600" />
          <h1 className="hidden items-center text-xl font-semibold text-gray-800 dark:text-white md:flex">
            WatchBox
          </h1>
        </button>

        <div className={`${session ? "flex" : "hidden"}`}>
          <div className="flex items-center md:hidden">
            <button
              className="nav-link absolute z-20 flex cursor-pointer items-center justify-center"
              onClick={() => {
                setShowSearchBar(!showSearhBar);
              }}
            >
              <MagnifyingGlassIcon className="nav-icon" />
            </button>
            {showSearhBar && (
              <div className="absolute z-10 ml-2 transition-all duration-300 ease-in-out">
                <input
                  type="text"
                  className="flex w-[165px] items-center rounded-lg border border-gray-100 bg-white p-2 pl-10 text-sm text-black placeholder-black outline-none dark:border-transparent dark:bg-grayColor dark:text-white dark:placeholder-white "
                  placeholder="Search WatchBox"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${session ? "flex" : "hidden"}`}>
        <div className="hidden items-center md:flex">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="nav-icon" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-100 bg-gray-100 p-1.5 pl-10 text-sm text-black placeholder-gray-500 outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-gray-300"
              placeholder="Search WatchBox"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center space-x-5">
          <div className={`${session ? "flex" : "hidden"}`}>
            <button
              onClick={() => router.push("/")}
              type="button"
              className="nav-link hidden md:inline-flex"
            >
              <HomeIcon className="nav-icon" />
            </button>
          </div>

          <div>{<ToggleTheme />}</div>

          <div className={`${session ? "flex" : "hidden"}`}>
            <AvatarDropdown session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
