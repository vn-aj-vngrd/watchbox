import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Common/Meta";
import { getServerSideSession } from "../../utils/session";

const account = () => {
  return (
    <>
      <Meta title="WatchBox | Box" />

      <div className="flex h-full w-full border-t border-b dark:border-darkColor">
        <div className="flex h-full w-72 flex-col border-r dark:border-darkColor">
          {/* Controls */}
          <div className="h-12 border-b dark:border-darkColor">Controls</div>
          {/* Left pane */}
          <div className="h-full">Left pane</div>
        </div>

        <div className="flex h-full grow flex-col">
          {/* Top bar */}
          <div className="h-12 border-b dark:border-darkColor">Top bar</div>
          {/* Canvas */}
          <div className="h-full">Canvas</div>
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
