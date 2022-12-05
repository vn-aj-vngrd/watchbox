// components/Layout.tsx

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <>
      <div className="flex h-screen select-none flex-col justify-between">
        <Header session={session} />
        <main
          className={`mx-auto w-full grow ${
            pathname.includes("/box") && !pathname.includes("/entry")
              ? "overflow-hidden"
              : "max-w-7xl px-4"
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
