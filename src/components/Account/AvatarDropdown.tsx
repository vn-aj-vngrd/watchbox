// components/AvatarDropdown.tsx

import { Menu, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon, Cog8ToothIcon, UserIcon } from "@heroicons/react/24/solid";
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

  return (
    <>
      {isLoading && <Spinner isGlobal={true} />}

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="nav-link inline-flex">
          {session?.user?.image ? (
            <div className="relative h-full w-full">
              <Image
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
                layout="fill"
                priority
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            <UserIcon className="nav-icon" />
          )}
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neutral-200 rounded-md border border-neutral-200 bg-white focus:outline-none dark:divide-grayColor dark:border-transparent dark:bg-darkColor">
            <div className="px-4 py-3">
              <p className="text-sm">Signed in as</p>
              <p className="truncate text-sm font-medium text-blue-500 dark:text-blue-400">
                {session?.user?.email}
              </p>
            </div>
            <div>
              <div className="py-1">
                <Menu.Item>
                  <button onClick={() => router.push("/account")} className="account-link">
                    <Cog8ToothIcon className="account-icon" />
                    Account Settings
                  </button>
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  <button onClick={onClick} className="account-link">
                    <ArrowLeftOnRectangleIcon className="account-icon" />
                    Sign Out
                  </button>
                </Menu.Item>
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default AvatarDropdown;
