// components/Header.tsx

import { HomeIcon, SquaresPlusIcon } from "@heroicons/react/24/solid";
import router from "next/router";
import ToggleTheme from "./ToggleTheme";
import AvatarDropdown from "../Account/AvatarDropdown";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const Header: React.FC<Props> = ({ session }) => {
  return (
    <header className="sticky top-0 z-10 py-4 bg-white shadow-sm dark:bg-darkerColor dark:border-darkerColor">
      <div className="flex flex-wrap items-center justify-between px-4 mx-auto ">
        <div>
          <button onClick={() => router.push("/")} className="hidden md:flex">
            <h1 className="flex items-center text-xl font-bold text-black dark:text-white">
              <SquaresPlusIcon className="w-6 h-6 mr-3 text-blue-600" />
              WatchBox
            </h1>
          </button>

          <button onClick={() => router.push("/")} className="flex md:hidden">
            <div className="flex items-center text-base font-semibold">
              <SquaresPlusIcon className="w-6 h-6 mr-2 fill-blue-600" />
            </div>
          </button>
        </div>

        <div>
          <div className="flex items-center space-x-5">
            {session ? (
              <>
                <div>
                  <button
                    onClick={() => router.push("/")}
                    type="button"
                    className="inline-flex items-center p-1 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor"
                  >
                    <HomeIcon className="w-5 h-5 fill-black dark:fill-white" />
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