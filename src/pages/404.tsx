// src/pages/404.tsx

import Meta from "../components/Meta";
import PageAlert from "../components/PageAlert";

export default function Custom404() {
  return (
    <>
      <Meta title="Watchbox - 404" />
      <PageAlert
        elem={
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            404
          </p>
        }
        title="Page not found"
        description="Please check the URL in the address bar and try again."
        btnTitle="Go back to home"
      />
    </>
  );
}
