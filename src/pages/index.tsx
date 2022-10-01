// src/pages/index.tsx

import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSideSession } from "../utils/session";
// import { trpc } from "../utils/trpc";
// import Spinner from "../components/Spinner";
import Meta from "../components/Meta";
import Dashboard from "../components/Dashboard";
import { Session } from "next-auth";

const Home: NextPage = () => {
  // const res = trpc.useQuery(["box.getBoxes", { skip: 0, take: 5 }]);

  // if (res.status === "loading") {
  //   return <Spinner />;
  // }

  return (
    <>
      <Meta title="Watchbox | Dashboard" />

      <div className=" min-h-[89.4vh] container mx-auto ">
        <Dashboard />
      </div>
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
