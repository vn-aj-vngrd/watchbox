// src/pages/index.tsx

import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSideSession } from "../utils/session";
import Meta from "../components/Meta";
import Boxes from "../components/Boxes";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Spinner from "../components/Spinner";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const [mode, setMode] = useState<"boxes" | "favorites">("boxes");

  return (
    <>
      <Meta />
      {session ? (
        <>
          <Meta title="Watchbox" />
          <div className=" min-h-[89.4vh] container mx-auto px-4">
            {mode === "boxes" ? (
              <Boxes setMode={setMode} />
            ) : (
              <>{/* Favorites Here */}</>
            )}
          </div>
        </>
      ) : (
        <Spinner isGlobal={true} />
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (ctx) {
    const session: Session | null = await getServerSideSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }

    if (session.user?.isNewUser === true) {
      return {
        redirect: {
          destination: "/auth/newuser",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Home;
