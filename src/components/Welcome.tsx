// components/Welcome.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import PageAlert from "../components/PageAlert";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";
import router from "next/router";
import { ArrowRightIcon, MegaphoneIcon } from "@heroicons/react/24/solid";

import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const description = [
  "WatchBox streamlines and simplifies the process of creating movie and TV show lists for you to share with others or keep for yourself. ",
  "To get started, click the button below to create your first box collection.",
];

const Welcome = () => {
  const { data: session, status } = useSession();

  const { mutate, isLoading } = trpc.useMutation(["auth.getStarted"], {
    onSuccess: () => {
      router.push("/");
    },
  });

  const refAnimationInstance = useRef({} as any);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, [fire]);

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
      <div className="container relative mx-auto">
        <div>
          <ReactCanvasConfetti
            refConfetti={getInstance}
            className="absolute left-0 right-0 h-full w-[31.25rem] mx-auto sm:w-[37.5rem] md:w-[44.688rem] lg:w-[58.75rem] pointer-events-none"
          />
        </div>

        <PageAlert
          elem={
            <h2 className="flex justify-center mb-10">
              <MegaphoneIcon className="w-10 h-10 text-blue-600" />
            </h2>
          }
          title={`Welcome, ${session?.user?.name?.split(" ")[0] || " User"}!`}
          description={description}
        />

        <div className="flex-col text-center">
          {isLoading ? (
            <button className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none">
              <svg
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
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
            <button
              onClick={() => mutate()}
              className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none"
            >
              Get Started <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          )}

          <p className="text-sm text-darkColor dark:text-white">
            By clicking the button, you agree to the {""}
            <button className="text-blue-500 hover:underline">
              terms and conditions.
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
