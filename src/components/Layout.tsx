// components/Layout.tsx


import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
