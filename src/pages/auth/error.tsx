// src/auth/error.tsx

import { XCircleIcon } from "@heroicons/react/24/solid";
import { NextApiRequest } from "next";
import PageAlert from "../../components/PageAlert";

const error = () => {
  return (
    <PageAlert
      elem={
        <h2 className="flex justify-center mb-5">
          <XCircleIcon className="h-12 w-12 text-blue-500" />
        </h2>
      }
      title="Sign in Error"
      description="There has been a problem signing you in. Please use another provider or try again."
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

export default error;
