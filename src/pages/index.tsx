// src/pages/index.tsx

import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  const res = trpc.useQuery(["example.hello", { text: "from ChatBox" }]);

  const { data: session } = useSession();
  if (session) {
    return (
      <div className="text-center justify-center space-y-4">
        <h1>{res.data?.greeting}</h1>
        <button
          className="bg-red-500 p-2 rounded hover:bg-red-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div>
      <button
        className="bg-blue-500 p-2 rounded hover:bg-blue-400"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Home;
