// components/Layout.tsx

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";
import { useSession } from "next-auth/react";
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
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
