import { HeartIcon as SolidHeartIcon, ShareIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = () => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="flex h-12 items-center border-b px-4 dark:border-darkColor">
      <div className="flex h-full grow items-center font-medium">Box Title</div>
      <div className="flex h-full items-center">
        <button
          onClick={() => setFavorite(!favorite)}
          className="flex h-full w-11 items-center justify-center"
        >
          {favorite ? (
            <SolidHeartIcon className="h-5 w-5 text-red-500" />
          ) : (
            <OutlineHeartIcon className="h-5 w-5 dark:text-white" />
          )}
        </button>
        <button className="flex h-full w-11 items-center justify-center">
          <ShareIcon className="h-[18px] w-[18px] dark:text-white" />
        </button>
        <button className="flex h-full w-11 items-center justify-center">
          <Cog6ToothIcon className="h-5 w-5 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;
