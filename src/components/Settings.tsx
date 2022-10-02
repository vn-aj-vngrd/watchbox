import {
  Cog8ToothIcon,
  ExclamationCircleIcon,
  PencilIcon,
  PencilSquareIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const Settings = () => {
  return (
    // <div>
    //   <p className="text-center text-2xl font-bold my-5">Account Settings</p>
    //   <div className="block mx-auto w-1/2 dark:bg-darkerColor border shadow-sm rounded-lg">
    //     <div className="p-8">
    //       <div>
    //         <div
    //           className="block bg-darkerColor border border-neutral-900 w-50 mx-auto rounded-full"
    //           style={{ width: "10vw", height: "10vw" }}
    //         ></div>
    //         <form className="w-full">
    //           <label
    //             htmlFor="username"
    //             className="block mb-2 text-lg font-semibold text-neutral-900"
    //           >
    //             Username
    //           </label>
    //           <input
    //             type="text"
    //             id="username"
    //             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //             required
    //           />
    //           <button
    //             type="submit"
    //             className="block w-full mt-4 bg-blue-600 hover:bg-blue-800 text-white py-2.5 rounded-lg"
    //           >
    //             Update Account
    //           </button>
    //           <button
    //             type="submit"
    //             className="block w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg"
    //           >
    //             Delete Account
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                  layout="fill"
                />
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
