import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon, LinkIcon } from "@heroicons/react/24/solid";
import { FavoriteBox } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { server } from "../../config";
import { trpc } from "../../utils/trpc";
import DeleteBox from "./DeleteBox";
import Information from "./Information";

type Props = {
  box:
    | {
        id: string;
        username: string | null;
        boxes: { id: string; created_at: Date; updated_at: Date; boxTitle: string }[];
      }
    | null
    | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
  refetch: () => void;
};

type Inputs = {
  boxTitle: string;
};

const Header = ({ box, favoriteBox, id, refetch }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

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

  const updateBox = trpc.useMutation("box.updateBox", {
    onSuccess: () => {
      refetch();
      document.dispatchEvent(new Event("visibilitychange"));
    },
  });

  const deleteBox = trpc.useMutation("box.deleteBox", {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
      router.push("/");
    },
  });

  const [favorite, setFavorite] = useState<boolean>(false);
  const [isBoxTitleChanged, setIsBoxTitleChanged] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const boxTitle_watch = watch("boxTitle");

  useEffect(() => {
    setFavorite(favoriteBox !== null && favoriteBox !== undefined ? true : false);
    setIsBoxTitleChanged(false);
    reset({ boxTitle: box?.boxes[0]?.boxTitle || "" });
  }, [favoriteBox, box, reset]);

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

  const onDeleteBox = () => {
    deleteBox.mutateAsync({
      id,
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsBoxTitleChanged(true);
    updateBox.mutateAsync({
      id,
      boxTitle: data.boxTitle,
    });
  };

  return (
    <div className="flex h-12 items-center border-b pl-4 pr-2 dark:border-darkColor">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full grow items-center space-x-2">
        <input
          type="text"
          disabled={session?.user?.id !== box?.id}
          className="mt-px w-40 border-b border-b-transparent bg-transparent font-medium focus:border-b-gray-200 focus:outline-none hover:border-b-gray-200 dark:focus:border-b-darkColor dark:hover:border-b-darkColor md:w-64"
          {...register("boxTitle", {
            required: {
              value: true,
              message: "* Box title is required",
            },
            minLength: {
              value: 4,
              message: "Title must be at least 4 characters.",
            },
          })}
        />
        <div className=" text-sm text-red-500">{errors.boxTitle && errors.boxTitle.message}</div>

        {boxTitle_watch !== box?.boxes[0]?.boxTitle && !errors.boxTitle && (
          <button
            className="flex items-center rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
            type="submit"
          >
            {isBoxTitleChanged ? (
              <>
                <svg
                  role="status"
                  className="mr-2 inline-flex h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Saving
              </>
            ) : (
              <>Save</>
            )}
          </button>
        )}
      </form>
      <div className="flex h-full items-center">
        <button onClick={onFavoriteBox} className="flex h-full w-11 items-center justify-center">
          {favorite ? (
            <SolidHeartIcon className="h-5 w-5 text-red-500" />
          ) : (
            <OutlineHeartIcon className="h-5 w-5 dark:text-white" />
          )}
        </button>
        <button className="flex h-full w-11 items-center justify-center">
          <LinkIcon
            className="h-[18px] w-[18px] dark:text-white"
            onClick={() => {
              navigator.clipboard.writeText(server + router.asPath);
              toast.success("Copied to clipboard");
            }}
          />
        </button>
        {session?.user?.id === box?.id && (
          <div className="flex h-full w-11 items-center justify-center">
            <DeleteBox onDeleteBox={onDeleteBox} />
          </div>
        )}

        <div className="flex h-full w-11 items-center justify-center">
          <Information box={box} />
        </div>
      </div>
    </div>
  );
};

export default Header;
