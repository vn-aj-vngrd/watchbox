// components/Layout.tsx

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
