// src/auth/error.tsx

import { NextApiRequest } from "next";
import Meta from "../../components/Common/Meta";
import PageAlert from "../../components/Common/PageAlert";
import { XCircleIcon } from "@heroicons/react/24/solid";

const description = [
  "The link has expired or something went wrong on our end.",
  "Please try again later.",
];

const error = () => {
  return (
    <>
      <Meta title="Error | WatchBox" />
      <PageAlert
        elem={
          <h2 className="mb-10 flex justify-center">
            <XCircleIcon className="h-12 w-12 text-red-500" />
          </h2>
        }
        title="Sign in Error"
        description={description}
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
