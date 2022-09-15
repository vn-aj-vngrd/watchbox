import { GetServerSidePropsContext } from "next";
import Meta from "../../components/Meta";
import { getServerSideSession } from "../../utils/session";

const account = () => {
  return (
    <>
      <Meta title="WatchBox | Box" />
      <p className="text-center">Box</p>
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
