// components/Welcome.tsx

import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import PageAlert from "../components/PageAlert";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";
import router from "next/router";
import { MegaphoneIcon } from "@heroicons/react/24/solid";

const Welcome = () => {
  const { data: session, status } = useSession();

  const { mutate, isLoading } = trpc.useMutation(["user.getStarted"], {
    onSuccess: () => {
      router.push("/");
    },
  });

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
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-10">
            <MegaphoneIcon className="w-12 h-12 text-blue-600" />
          </h2>
        }
        title={`Welcome, ${session?.user?.name?.split(" ")[0] || ""}!`}
        description="WatchBox streamlines and simplifies the process of creating movie and TV show lists for fans to share with others or keep for themselves. "
      />
      <div className="flex justify-center">
        <button
          onClick={() => mutate()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none"
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Welcome;
