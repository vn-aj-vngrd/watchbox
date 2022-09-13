import Link from "next/link";

type ErrorProps = {
  code: string;
  title: string;
  description: string;
};

const Error: React.FC<ErrorProps> = ({ code, title, description }) => {
  return (
    <div className="items-center mx-auto my-auto text-center max-w-max">
      <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">{code}</p>
      <div className="">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-base text-gray-500 dark:text-white">
          {description}
        </p>
      </div>
      <div className="flex justify-center mt-10">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-dark border border-transparent rounded-md shadow-sm hover:bg-darker focus:outline-none">
          <Link href="/">Go back to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default Error;
