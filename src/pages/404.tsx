// src/pages/404.tsx

import Meta from "../components/Meta";
import PageAlert from "../components/PageAlert";

const Custom404 = () => {
  return (
    <>
      <Meta title="Watchbox | 404" />
      <PageAlert
        elem={
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            404
          </p>
        }
        title="Page not found"
        description="The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct."
        btnTitle="Go back to home"
      />
    </>
  );
};

export default Custom404;
