import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import { getServerSideSession } from "../../utils/session";

const entry = () => {
  return (
    <>
      <Meta title="WatchBox | Entry" />
      <p className="text-center">Entry</p>
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

export default entry;
