// src/pages/index.tsx

import type { NextPage } from "next";
// import { trpc } from "../utils/trpc";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Home;
