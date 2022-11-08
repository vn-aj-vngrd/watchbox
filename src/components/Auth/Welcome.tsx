// components/Welcome.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArrowRightIcon, ExclamationCircleIcon, MegaphoneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import Meta from "../Common/Meta";
import PageAlert from "../Common/PageAlert";
import Spinner from "../Common/Spinner";
import Confetti from "./Confetti";
const description = [
  "WatchBox streamlines and simplifies the process of creating movie and TV show lists for you to share with others or keep for yourself. ",
  "To get started, type you username below.",
];

type Inputs = {
  username: string;
};

const Welcome = () => {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    reset();
  }, [reset]);

  const { mutate, isLoading, error } = trpc.useMutation(["user.getStarted"], {
    onSuccess: () => {
      document.dispatchEvent(new Event("visibilitychange"));
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  if (status === "loading") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Meta title="Watchbox | Welcome" />
      <div className="flex h-full flex-col items-center justify-center space-y-10">
        <Confetti />

        <div>
          <PageAlert
            elem={
              <h2 className="mb-10 flex justify-center">
                <MegaphoneIcon className="h-10 w-10 text-blue-600" />
              </h2>
            }
            title={`Welcome, ${session?.user?.name?.split(" ")[0] || " User"}!`}
            description={description}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto mb-10 max-w-xs space-y-6">
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Type your username here"
                className={
                  errors.username
                    ? "block w-full appearance-none rounded-md border border-red-400 px-3 py-2 placeholder-red-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                    : "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-darkerColor dark:focus:border-blue-500 dark:focus:ring-blue-400 sm:text-sm"
                }
                {...register("username", {
                  required: {
                    value: true,
                    message: "* Please enter a username to continue.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]{5,}$/,
                    message:
                      "* Username must be at least 5 characters long and contain only letters and numbers.",
                  },
                })}
              />
              {errors.username && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
              )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="flex-col text-center">
            {isLoading ? (
              <button className="mb-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none hover:bg-blue-500">
                <svg
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-white"
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
                Loading
              </button>
            ) : (
              <button className="mb-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none hover:bg-blue-500">
                Get Started <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            )}

            <p className="text-sm text-darkColor dark:text-white">
              By clicking the button, you agree to the {""}
              <button className="text-blue-500 hover:underline">terms and conditions.</button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Welcome;
