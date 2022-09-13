// src/pages/404.tsx

import PageAlert from "../components/PageAlert";

export default function Custom404() {
  return (
    <PageAlert
      elem={
        <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">404</p>
      }
      title="Page not found"
      description="Please check the URL in the address bar and try again."
      btnTitle="Go back to home"
    />
  );
}
