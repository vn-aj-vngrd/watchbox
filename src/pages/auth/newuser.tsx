import Link from "next/link";

const newuser = () => {
  return (
    <div className="justify-center space-y-4 text-center">
      <div>Welcome New User!</div>
      <div>
        <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-400">
          <Link href="/">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default newuser;
