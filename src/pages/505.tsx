// src/pages/505.tsx

import Meta from "../components/Meta";
import PageAlert from "../components/PageAlert";

const description = [
  "Something went wrong on our end.",
  "Please try again later.",
]

const Custom500 = () => {
  return (
    <>
      <Meta title="Watchbox | 505" />
      <PageAlert
        elem={
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            505
          </p>
        }
        title="Server-side error"
        description={description}
        btnTitle="Go back to home"
      />
    </>
  );
};

export default Custom500;
