// src/auth/verifyrequest.tsx

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { NextApiRequest } from "next";
import PageAlert from "../../components/PageAlert";

const verifyrequest = () => {
  return (
    <PageAlert
      elem={
        <h2 className="flex justify-center mb-5">
          <CheckBadgeIcon className="h-12 w-12 text-blue-500" />
        </h2>
      }
      title="Sign in Request"
      description="A link has been sent to your email address. Please click on the link to sign in."
      btnTitle="Go back to home"
    />
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const callback = req.query?.callbackUrl;

  if (!callback) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};

export default verifyrequest;
