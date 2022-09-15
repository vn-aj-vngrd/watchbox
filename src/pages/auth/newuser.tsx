// src/auth/newuser.tsx

import PageAlert from "../../components/PageAlert";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { useSession } from "next-auth/react";
import Spinner from "../../components/Spinner";
import { getServerSideSession } from "../../utils/session";
import Meta from "../../components/Meta";
import { MegaphoneIcon } from "@heroicons/react/24/solid";

const newuser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session, status } = useSession();

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
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-10">
            <MegaphoneIcon className="w-12 h-12 text-blue-600" />
          </h2>
        }
        title={`Welcome, ${session?.user?.name?.split(" ")[0] || ""}!`}
        description="WatchBox streamlines and simplifies the process of creating movie and TV show lists for fans to share with others or keep for themselves. "
        btnTitle="Get Started"
      />
    </>
  );
};

export const getServerSideProps = async (
  req: NextApiRequest,
  ctx: GetServerSidePropsContext
) => {
  const callback = req.query?.callbackUrl;

  const session = await getServerSideSession(ctx);

  if (!callback || !session) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default newuser;
