// components/Header.tsx

import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#525252]">
      <button className="flex">
        <Link href="/">
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
        </Link>
      </button>
      <div>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
