// src/pages/500.tsx

import Meta from "../components/Common/Meta";
import PageAlert from "../components/Common/PageAlert";

const description = ["Something went wrong on our end.", "Please try again later."];

const Custom500 = () => {
  return (
    <>
      <Meta title="Watchbox | 500" />
      <PageAlert
        elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">500</p>}
        title="Server-side error"
        description={description}
        btnTitle="Go back to home"
      />
    </>
  );
};

export default Custom500;
