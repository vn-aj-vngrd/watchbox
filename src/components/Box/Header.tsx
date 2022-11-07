import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { Cog6ToothIcon, HeartIcon as SolidHeartIcon, ShareIcon } from "@heroicons/react/24/solid";
import { FavoriteBox } from "@prisma/client";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import Spinner from "../Common/Spinner";

type Props = {
  boxTitle: string | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
};

const Header = ({ boxTitle, favoriteBox, id }: Props) => {
  const addFavoriteBox = trpc.useMutation("favorite.addFavoriteBox", {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const deleteFavoriteBox = trpc.useMutation("favorite.deleteFavoriteBox", {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    setFavorite(favoriteBox !== null && favoriteBox !== undefined ? true : false);
  }, [favoriteBox]);

  const onFavoriteBox = () => {
    if (favorite) {
      deleteFavoriteBox.mutateAsync({
        boxId: id,
      });

      setFavorite(false);
      return;
    }

    addFavoriteBox.mutateAsync({
      boxId: id,
    });
    setFavorite(true);
  };

  if (addFavoriteBox.isLoading || deleteFavoriteBox.isLoading) {
    return <Spinner isGlobal={true} />;
  }

  return (
    <div className="flex h-12 items-center border-b pl-4 pr-2 dark:border-darkColor">
      <div className="flex h-full grow items-center font-medium">
        <input
          type="text"
          className="mt-px w-40 border-b border-b-transparent bg-transparent focus:border-b-gray-200 focus:outline-none hover:border-b-gray-200 dark:focus:border-b-darkColor dark:hover:border-b-darkColor md:w-64"
          defaultValue={boxTitle}
        />
      </div>
      <div className="flex h-full items-center">
        <button onClick={onFavoriteBox} className="flex h-full w-11 items-center justify-center">
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
