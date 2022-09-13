// src/auth/verifyrequest.tsx

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Meta from "../../components/Meta";
import PageAlert from "../../components/PageAlert";

const verifyrequest = () => {
  return (
    <>
      <Meta title="Watchbox - Verify Request" />
      <PageAlert
        elem={
          <h2 className="flex justify-center mb-5">
            <CheckBadgeIcon className="w-12 h-12 text-blue-600" />
          </h2>
        }
        title="Sign in Request"
        description="A link has been sent to your email address. Please click on the link to sign in within 10 minutes."
        btnTitle="Go back to home"
      />
    </>
  );
};

export default verifyrequest;
