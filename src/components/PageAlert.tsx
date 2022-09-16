// components/PageAlert.tsx

import router from "next/router";

type Props = {
  elem?: JSX.Element;
  title?: string;
  description?: string;
  btnTitle?: string;
};

const PageAlert: React.FC<Props> = ({ elem, title, description, btnTitle }) => {
  return (
    <div className="items-center mx-auto my-auto text-center max-w-max">
      {elem && <>{elem}</>}
      <div className="">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          {title || "Welcome to WatchBox!"}
        </h1>
        <p className="mt-4 text-base text-gray-500 dark:text-white">
          {description || ""}
        </p>
      </div>
      <div className="flex justify-center mt-10">
        {btnTitle && (
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none"
          >
            {btnTitle}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageAlert;
