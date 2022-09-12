// src/pages/index.tsx

import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useSession, signOut } from "next-auth/react";
import Login from "../components/Login";

const Home: NextPage = () => {
  const res = trpc.useQuery(["example.hello", { text: "from ChatBox" }]);

  const { data: session } = useSession();
  if (session) {
    return (
      <div className="justify-center space-y-4 text-center">
        <h1>{res.data?.greeting}</h1>
        <button
          className="p-2 bg-red-500 rounded hover:bg-red-400"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return <Login />;
};

export default Home;
