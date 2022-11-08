// components/Header.tsx

import { HomeIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import router from "next/router";
import AvatarDropdown from "../Account/AvatarDropdown";
import ToggleTheme from "./ToggleTheme";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-white py-2.5 dark:border-darkerColor dark:bg-darkerColor">
      <div className="mx-auto flex flex-wrap items-center justify-between px-4">
        <div>
          <button onClick={() => router.push("/")} className="hidden md:flex">
            <h1 className="flex items-center text-xl font-semibold text-black dark:text-white">
              <SquaresPlusIcon className="mr-3 h-6 w-6 text-blue-600" />
              WatchBox
            </h1>
          </button>

          <button onClick={() => router.push("/")} className="flex md:hidden">
            <div className="flex items-center text-base font-semibold">
              <SquaresPlusIcon className="mr-2 h-6 w-6 fill-blue-600" />
            </div>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-center space-x-5">
            {session ? (
              <>
                <div>
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none hover:bg-gray-200 dark:border-transparent dark:bg-darkColor dark:text-white dark:hover:bg-grayColor"
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
