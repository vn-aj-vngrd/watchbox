import { GetServerSidePropsContext } from "next";
import { getServerSideSession } from "../../utils/session";
import BoxPage from "../../components/Box/BoxPage";
import Meta from "../../components/Common/Meta";

const account = () => {
  return (
    <>
      <Meta title="Box | WatchBox" />
      <BoxPage />
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
