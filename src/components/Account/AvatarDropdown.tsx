// components/AvatarDropdown.tsx

import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import Spinner from "../Common/Spinner";

type Props = {
  session: Session | null;
};

const AvatarDropdown = ({ session }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onClick = () => {
    setIsLoading(true);
    signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  if (isLoading) {
    return <Spinner isGlobal={true} />;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="relative inline-flex h-10 w-10">
          <div className="absolute top-0.5 left-0 h-full w-full">
            <Image
              src={session?.user?.image || ""}
              alt=""
              layout="fill"
              priority
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-grayColor dark:bg-darkColor">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-blue-500 dark:text-blue-400">
              {session?.user?.email}
            </p>
          </div>
          <div className="py-1 ">
            <Menu.Item>
              <button
                onClick={() => router.push("/account")}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-grayColor"
              >
                <Cog8ToothIcon className="mr-2 h-6 w-6 rounded-full p-[0.1rem] dark:text-white" />
                Account Settings
              </button>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <button
                onClick={onClick}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-grayColor"
              >
                <ArrowLeftOnRectangleIcon className="mr-2 h-6 w-6 rounded-full p-[0.1rem] dark:text-white" />
                Sign Out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AvatarDropdown;
