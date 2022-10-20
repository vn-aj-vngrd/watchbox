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
      <Meta title="Watchbox | Sign In Error" />
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-10">
            <XCircleIcon className="w-12 h-12 text-red-500" />
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
