// src/pages/index.tsx

import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSideSession } from "../utils/session";
// import { trpc } from "../utils/trpc";
// import Spinner from "../components/Spinner";
import Meta from "../components/Meta";
import Dashboard from "../components/Dashboard";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Spinner from "../components/Spinner";

const Home: NextPage = () => {
  // const res = trpc.useQuery(["box.getBoxes", { skip: 0, take: 5 }]);

  // if (res.status === "loading") {
  //   return <Spinner />;
  // }

  const { data: session } = useSession();

  return (
    <>
      <Meta />

      {session ? (
        <>
          <Meta title="Watchbox" />
          {/* Edit this component below */}
          <div className=" min-h-[89.4vh] container mx-auto px-4">
            <Dashboard />
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
