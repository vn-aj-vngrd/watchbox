import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Cog8ToothIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Spinner from "./Spinner";
import router from "next/router";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const Account: React.FC<Props> = ({ session }) => {
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
        <Menu.Button className="inline-flex items-center p-1 text-gray-900 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 focus:outline-none dark:bg-darkColor dark:text-white dark:border-transparent dark:hover:bg-grayColor">
          <div className="w-5 h-5">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image || ""}
                loader={({ src }) => `${src}?w=500&q=100`}
                alt=""
                layout="fill"
                priority
                className="rounded-full relative"
              />
            ) : (
              <UserIcon />
            )}
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
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-darkColor dark:divide-grayColor">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="text-sm font-medium text-blue-500 truncate dark:text-blue-400">
              {session?.user?.email}
            </p>
          </div>
          <div className="py-1 ">
            <Menu.Item>
              <button
                onClick={() => router.push("/account")}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-grayColor"
              >
                <Cog8ToothIcon className="w-6 h-6 p-[0.1rem] mr-2 rounded-full dark:text-white" />
                Account Settings
              </button>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <button
                onClick={onClick}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-grayColor"
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6 p-[0.1rem] mr-2 rounded-full dark:text-white" />
                Sign Out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Account;
