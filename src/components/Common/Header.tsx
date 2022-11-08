// components/Header.tsx

import { HomeIcon, MagnifyingGlassIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import router from "next/router";
import AvatarDropdown from "../Account/AvatarDropdown";
import ToggleTheme from "./ToggleTheme";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-100 bg-white py-2.5 dark:border-b dark:border-grayColor dark:bg-darkerColor">
      <div className="mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="space-x-2m hidden items-center justify-center md:flex">
          <button onClick={() => router.push("/")} className="flex">
            <h1 className="flex items-center text-xl font-semibold text-black dark:text-white">
              <SquaresPlusIcon className="mr-3 h-6 w-6 text-blue-600" />
              WatchBox
            </h1>
          </button>
        </div>

        {session && (
          <div className="flex items-center">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-black dark:text-white" />
              </div>
              <input
                type="text"
                id="searchInput"
                name="searchInput"
                // onChange={(e) => onSearch(e)}
                className="block w-full rounded-lg border border-gray-100 bg-gray-100 p-2 pl-10 text-sm text-black placeholder-black outline-none dark:border-transparent dark:bg-darkColor dark:text-white dark:placeholder-white"
                placeholder="Search WatchBox"
              />
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-center space-x-5">
            {session ? (
              <>
                <div>
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full  bg-gray-100 focus:outline-none hover:bg-gray-100 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
                  >
                    <HomeIcon className="h-5 w-5 fill-black dark:fill-white" />
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
