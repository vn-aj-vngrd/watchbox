// components/Layout.tsx

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { pathname } = useRouter();

  if (status === "loading") {
    return <Spinner isGlobal={true} />;
  }

  return (
    <>
      <Meta />
      <div className="flex h-screen flex-col justify-between">
        <Header session={session} />
        <main
          className={`mx-auto w-full grow ${
            pathname.includes("/box") ? "overflow-hidden" : "max-w-7xl px-4"
          }`}
        >
          {children}
        </main>
        {pathname === "/auth/signin" ? <Footer /> : <div />}
      </div>
    </>
  );
};

export default Layout;
