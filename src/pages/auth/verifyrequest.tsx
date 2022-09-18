// src/auth/verifyrequest.tsx

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Meta from "../../components/Meta";
import PageAlert from "../../components/PageAlert";
import { getServerSideSession } from "../../utils/session";
import { trpc } from "../../utils/trpc";

const description = [
  "A link has been sent to your email address",
  "The link will expire in 10 minutes",
];

const verifyrequest = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const email = useRouter().query.email;
  if (email) {
    const res = trpc.useQuery(["auth.validateVerifyRequest", { email: "" }]);
  }

  return (
    <>
      <Meta title="Watchbox | Verify Request" />
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-10">
            <ArrowRightOnRectangleIcon className="w-12 h-12 text-blue-600" />
          </h2>
        }
        title="Verify Request"
        description={description}
        btnTitle="Go back to home"
      />
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (ctx) {
    const session = await getServerSideSession(ctx);

    if (session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default verifyrequest;
