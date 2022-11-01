// components/Layout.tsx

import { useSession } from "next-auth/react";
import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import Spinner from "./Spinner";

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
      <div className="flex flex-col justify-between h-screen">
        <Header session={session} />
        <main className="w-full px-4 mx-auto max-w-7xl">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
