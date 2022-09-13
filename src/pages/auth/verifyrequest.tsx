// src/auth/verifyrequest.tsx

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import Meta from "../../components/Meta";
import PageAlert from "../../components/PageAlert";

const verifyrequest = () => {
  return (
    <>
      <Meta title="Watchbox - Verify Request" />
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-10">
            <ArrowRightOnRectangleIcon className="w-12 h-12 text-blue-600" />
          </h2>
        }
        title="Verify Request"
        description="A link has been sent to your email address. Please click on the link to sign in within 10 minutes."
        btnTitle="Go back to home"
      />
    </>
  );
};

export default verifyrequest;
