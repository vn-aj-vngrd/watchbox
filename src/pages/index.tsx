// src/pages/index.tsx

import type { GetServerSidePropsContext, NextPage } from "next";
import { trpc } from "../utils/trpc";
import PageAlert from "../components/PageAlert";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import { getServerSideSession } from "../utils/session";
import Spinner from "../components/Spinner";
import Meta from "../components/Meta";
import { Session } from "next-auth";

const Home: NextPage = () => {
  const res = trpc.useQuery(["box.getBoxes", { skip: 0, take: 5 }]);

  if (!res.data) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title="Watchbox | Dashboard" />
      <div className="justify-center space-y-4 text-center">
        <PageAlert
          elem={
            <h2 className="flex justify-center mb-10">
              <MegaphoneIcon className="w-12 h-12 text-blue-600" />
            </h2>
          }
          title="Welcome back to WatchBox!"
          // description={`${res.data?.greeting}!`}
          btnTitle="Get Started"
        />
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session: Session | null = await getServerSideSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
