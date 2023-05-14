import { HomeIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { Session } from "next-auth";
import router from "next/router";
import AvatarDropdown from "../Account/AvatarDropdown";
import Search from "./Search";
import ToggleTheme from "./ToggleTheme";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 bg-white py-1.5 px-5 dark:border-grayColor dark:bg-darkerColor">
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
      </div>

      <div className={`${session && !session.user?.isNewUser ? "flex" : "hidden"}`}>
        <Search />
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
