// src/auth/error.tsx

import { NextApiRequest } from "next";
import Meta from "../../components/Meta";
import PageAlert from "../../components/PageAlert";
import { XCircleIcon } from "@heroicons/react/24/solid";

const error = () => {
  return (
    <>
      <Meta title="Watchbox - Sign In Error" />
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-5">
            <XCircleIcon className="w-12 h-12 text-blue-500" />
          </h2>
        }
        title="Sign in Error"
        description="There has been a problem signing you in. Please use another provider or try again."
        btnTitle="Go back to home"
      />
    </>
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const error = req.query?.error;

  if (!error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};

export default error;
