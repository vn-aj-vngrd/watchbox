// src/auth/newuser.tsx

import { MegaphoneIcon } from "@heroicons/react/24/solid";
import PageAlert from "../../components/PageAlert";
import { NextApiRequest } from "next";

const newuser = () => {
  return (
    <PageAlert
      elem={
        <h2 className="flex justify-center mb-5">
          <MegaphoneIcon className="h-12 w-12 text-blue-500" />
        </h2>
      }
      title="Welcome to WatchBox!"
      description="WatchBox streamlines and simplifies the process of creating movie and TV show lists for fans to share with others or keep for themselves. "
      btnTitle="Get Started"
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

export default newuser;
