// src/pages/505.tsx

import PageAlert from "../components/PageAlert";

export default function Custom500() {
  return (
    <PageAlert
      elem={
        <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">505</p>
      }
      title="Server-side error"
      description="Please try again later."
      btnTitle="Go back to home"
    />
  );
}
