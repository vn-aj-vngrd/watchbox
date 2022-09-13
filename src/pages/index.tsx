// src/pages/index.tsx

import type { GetServerSidePropsContext, NextPage } from "next";
import { trpc } from "../utils/trpc";
import { signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

const Home: NextPage = () => {
  const res = trpc.useQuery(["example.hello", { text: "from ChatBox" }]);

  return (
    <div className="justify-center space-y-4 text-center">
      <h1>{res.data?.greeting}</h1>
      <button
        className="p-2 text-white bg-red-500 rounded hover:bg-red-400"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Home;
