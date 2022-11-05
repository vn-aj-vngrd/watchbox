// components/Layout.tsx

import { useSession } from "next-auth/react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import Spinner from "./Spinner";
import router from "next/router";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner isGlobal={true} />;
  }

  return (
    <>
      <Meta />
      <div className="flex h-screen flex-col justify-between">
        <Header session={session} />
        <main
          className={
            router.pathname.includes("/box")
              ? "mx-auto w-full grow overflow-hidden"
              : "mx-auto w-full max-w-7xl px-4"
          }
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
