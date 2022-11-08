// components/Information.tsx

import { Menu, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { Fragment } from "react";

type Props = {
  box:
    | {
        username: string | null;
        boxes: { id: string; created_at: Date; updated_at: Date; boxTitle: string }[];
      }
    | null
    | undefined;
};

const Information = ({ box }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex">
        <InformationCircleIcon className="h-[22px] w-[22px] dark:text-white" />
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
        <Menu.Items className="absolute right-0 mt-2 w-[22rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-grayColor dark:bg-darkColor">
          <Menu.Item>
            <div className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-900 dark:text-white">
              <span className="mr-1 font-semibold"> Owner: </span> {box?.username}
            </div>
          </Menu.Item>

          <Menu.Item>
            <div className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-900 dark:text-white">
              <span className="mr-1 font-semibold">Date Created: </span>
              {moment(box?.boxes[0]?.created_at).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </Menu.Item>

          <Menu.Item>
            <div className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-900 dark:text-white">
              <span className="mr-1 font-semibold">Date Updated: </span>
              {moment(box?.boxes[0]?.updated_at).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Information;