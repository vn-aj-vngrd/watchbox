import { Menu, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import {
  HeartIcon as OutlineHeartIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeartIcon,
  EllipsisVerticalIcon,
  LockClosedIcon,
  GlobeAsiaAustraliaIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Box, FavoriteBox, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, Fragment } from "react";
import toast from "react-hot-toast";
import { server } from "../../config";
import { trpc } from "../../utils/trpc";
import DeleteBox from "./DeleteBox";
import Information from "./Information";
import * as Popover from "@radix-ui/react-popover";

type Props = {
  box: (User & { boxes: Box[] }) | null | undefined;
  favoriteBox: FavoriteBox | null | undefined;
  id: string;
  temp: string[];
  refetch: () => void;
};

const Header = ({ box, favoriteBox, id, temp, refetch }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const spanRef = useRef<HTMLSpanElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

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
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    setFavorite(favoriteBox !== null && favoriteBox !== undefined ? true : false);
    setIsPublic(box?.boxes[0]?.isPublic ? true : false);
  }, [favoriteBox, box]);

  const onFavoriteBox = () => {
    if (favorite) {
      deleteFavoriteBox.mutateAsync({
        boxId: id,
      });

      setFavorite(false);
      toast.success("Removed from favorites");

      return;
    }

    addFavoriteBox.mutateAsync({
      boxId: id,
    });

    setFavorite(true);
    toast.success("Added to favorites");
  };

  const onLockUnlock = () => {
    updateBox.mutateAsync({
      id,
      boxTitle: box?.boxes[0]?.boxTitle as string,
      isPublic: !isPublic,
    });

    setIsPublic(!isPublic);
    toast.success(isPublic ? "Box is now private" : "Box is now public");
  };

  const onDeleteBox = () => {
    deleteBox.mutateAsync({
      id,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
    const title = spanRef.current?.innerText;

    if (spanRef.current && title === "") {
      spanRef.current.innerText = box?.boxes[0]?.boxTitle as string;
      return;
    }

    if (title && title.length > 25) {
      setErrors(["Title cannot exceed 25 characters"]);
      return;
    }

    setErrors([]);

    updateBox.mutateAsync({
      id,
      boxTitle: title as string,
      isPublic: isPublic,
    });

    if (!spanRef.current?.contains(event.relatedTarget)) {
      window.getSelection()?.removeAllRanges();
    }
  };

  return (
    <div className="flex h-12 items-center border-b pl-4 pr-2 dark:border-darkColor">
      <div className="flex h-full grow items-center">
        <span
          ref={spanRef}
          onBlur={handleBlur}
          className={`mt-px border-b border-b-transparent pl-1 pr-3 outline-none ${
            session?.user?.id === box?.id &&
            "focus:border-b-gray-200 hover:border-b-gray-200 dark:focus:border-b-darkColor dark:hover:border-b-darkColor"
          }`}
          spellCheck="false"
          contentEditable={session?.user?.id === box?.id}
          suppressContentEditableWarning
        >
          {box?.boxes[0]?.boxTitle}
        </span>
        {session?.user?.id === box?.id && (
          <>
            {errors.length > 0 ? (
              <Popover.Root>
                <Popover.Trigger>
                  <InformationCircleIcon className="mt-0.5 mr-2 h-4 w-4 text-red-500" />
                </Popover.Trigger>
                <Popover.Content
                  align="center"
                  side="bottom"
                  sideOffset={4}
                  className="-ml-1.5 rounded-md bg-red-500 px-3 py-2 text-sm text-white"
                >
                  <Popover.Arrow className="ml-1.5 fill-red-500" />
                  {errors[0]}
                </Popover.Content>
              </Popover.Root>
            ) : (
              <>
                {temp.length > 0 ? (
                  <ArrowPathIcon className="mt-0.5 mr-2 h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <CheckCircleIcon className="mt-0.5 mr-2 h-4 w-4 text-blue-500" />
                )}
              </>
            )}
          </>
        )}
      </div>

      <button
        onClick={onFavoriteBox}
        className="flex h-full w-10 items-center justify-center md:w-12"
      >
        {favorite ? (
          <SolidHeartIcon className="h-5 w-5 text-red-500" />
        ) : (
          <OutlineHeartIcon className="h-5 w-5 dark:text-white" />
        )}
      </button>

      <button
        className="flex h-full w-10 items-center justify-center md:w-12"
        onClick={() => {
          navigator.clipboard.writeText(server + router.asPath);
          toast.success("Copied to clipboard");
        }}
      >
        <LinkIcon className="h-5 w-5 dark:text-white" />
      </button>

      <Menu as="div" className="flex">
        <Menu.Button className="flex h-full w-10 items-center justify-center">
          <EllipsisVerticalIcon className="h-[22px] w-[22px]" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-3 z-50 mt-7 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white dark:divide-grayColor dark:border-transparent dark:bg-darkColor">
            {session?.user?.id === box?.id && (
              <div className="rounded-t-md hover:bg-gray-100 dark:hover:bg-grayColor">
                <Menu.Item>
                  <button
                    onClick={onLockUnlock}
                    className="flex w-full items-center justify-start py-2 px-4"
                  >
                    {isPublic ? (
                      <GlobeAsiaAustraliaIcon className="h-5 w-5 dark:text-white" />
                    ) : (
                      <LockClosedIcon className="h-5 w-5 dark:text-white" />
                    )}
                    <div className="px-3 pb-px text-left text-sm">
                      {isPublic ? "Make Private" : "Make Public"}
                    </div>
                  </button>
                </Menu.Item>
              </div>
            )}
            {session?.user?.id === box?.id && (
              <div className="hover:bg-gray-100 dark:hover:bg-grayColor">
                <Menu.Item>
                  <DeleteBox onDeleteBox={onDeleteBox} />
                </Menu.Item>
              </div>
            )}
            <div
              className={`rounded-b-md hover:bg-gray-100 dark:hover:bg-grayColor ${
                session?.user?.id !== box?.id && "rounded-t-md"
              }`}
            >
              <Menu.Item>
                <Information box={box} />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Header;
