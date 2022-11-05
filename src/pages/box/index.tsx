import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import Controls from "../../components/Box/Controls";
import Components from "../../components/Box/Components";
import Header from "../../components/Box/Header";
import Canvas from "../../components/Box/Canvas";
import { getServerSideSession } from "../../utils/session";

const account = () => {
  return (
    <>
      <Meta title="WatchBox | Box" />
      <div className="flex h-full w-full border-t border-b dark:border-darkColor">
        <div className="flex h-full w-72 flex-col border-r dark:border-darkColor">
          <Controls />
          <Components />
        </div>
        <div className="flex h-full grow flex-col">
          <Header />
          <Canvas />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSideSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default account;
