// src/pages/404.tsx

import Meta from "../components/Common/Meta";
import PageAlert from "../components/Common/PageAlert";

const description = [
  "The page you are looking for does not exist.",
  "Please check the URL and try again.",
];

const Custom404 = () => {
  return (
    <>
      <Meta title="Watchbox | 404" />
      <PageAlert
        elem={<p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>}
        title="Page not found"
        description={description}
        btnTitle="Go back to home"
      />
    </>
  );
};

export default Custom404;
