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

  const { mutate, isLoading } = trpc.useMutation(["user.getStarted"], {
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

  if (status === "loading" || isLoading) {
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
          <button
            onClick={() => mutate()}
            className="inline-flex items-center px-4 py-2 mb-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none"
          >
            Get Started <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
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
