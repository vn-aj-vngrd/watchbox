// src/auth/verifyrequest.tsx

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import PageAlert from "../../components/Common/PageAlert";
import { getServerSideSession } from "../../utils/session";

const description = [
  "A link has been sent to your email address.",
  "The link will expire in 10 minutes.",
];

const verifyrequest = () => {
  return (
    <>
      <Meta title="Verify Request | WatchBox" />
      <PageAlert
        elem={
          <h2 className="mb-10 flex justify-center">
            <ArrowRightOnRectangleIcon className="h-12 w-12 text-blue-600" />
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
        notFound: true,
      };
    }
  }

  return {
    props: {},
  };
};

export default verifyrequest;
