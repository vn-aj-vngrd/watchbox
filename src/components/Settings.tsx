import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Settings = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md py-12 space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-4 text-3xl font-bold text-center text-gray-900 dark:text-white">
            Account Settings
          </h2>
        </div>

        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10 dark:bg-darkerColor">
          <form

          //   onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
              <div className="mx-auto relative w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
                <Image
                  className="absolute z-0 w-24 h-24 rounded-full"
                  loader={() => `${session?.user?.image}?w=500&q=100` || ""}
                  src={session?.user?.image || ""}
                  alt=""
                  layout="fill"
                />
                {}
                <PencilSquareIcon className="absolute bottom-0 right-0 w-8 h-8 z-20 p-1.5 rounded-full bg-white border text-gray-700 shadow-sm dark:bg-grayColor dark:border-grayColor dark:text-white cursor-pointer" />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Username
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Username"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {/* {errors.email && errors.email.message} */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  First Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Username"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {/* {errors.email && errors.email.message} */}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Last Name
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Username"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                <div className="mt-3 text-sm text-red-500">
                  {/* {errors.email && errors.email.message} */}
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>

              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
