import router from "next/router";

type Props = {
  elem?: JSX.Element | null;
  title?: string | null;
  description?: string[] | null;
  btnTitle?: string | null;
};

const PageAlert: React.FC<Props> = ({ elem, title, description, btnTitle }) => {
  return (
    <div className="mx-auto my-auto flex h-full max-w-max flex-col items-center justify-center text-center">
      {elem && <>{elem}</>}

      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        {title || "Welcome to WatchBox!"}
      </h1>

      <p className="mt-4 px-5 text-base text-gray-500 dark:text-white">
        {description?.map((desc, key) => (
          <span key={key}>
            {desc}
            <br />
          </span>
        ))}
      </p>

      {btnTitle && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none hover:bg-blue-500"
          >
            {btnTitle}
          </button>
        </div>
      )}
    </div>
  );
};

export default PageAlert;
