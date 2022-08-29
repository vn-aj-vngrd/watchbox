// components/Layout.tsx

import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>WatchBox</title>
      </Head>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="grid justify-center h-full place-items-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
